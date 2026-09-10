import { test, expect } from '@playwright/test';

// Exercise actual DOM flows; never send test favorites to the live API.
test.beforeEach(async ({ page }) => {
  await page.route('https://**/*', route => route.abort());
});

async function start(page, settings = {}) {
  await page.addInitScript(values => {
    if (sessionStorage.getItem('test-seeded')) return;

    const defaults = {
      uiLanguage: 'en',
      textLanguage: 'en',
      colorTheme: 'light',
      ...values,
    };
    for (const [key, value] of Object.entries(defaults)) {
      localStorage.setItem(key, value);
    }
    sessionStorage.setItem('test-seeded', 'yes');
  }, settings);

  await page.goto('/');
  await expect(page.locator('#verseOfTheDay .verse').first()).toBeVisible();
}

async function expectLayoutToFit(page) {
  const viewport = page.viewportSize();
  for (const link of await page.locator('.tablinks:visible').all()) {
    const box = await link.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + 1);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
  }

  const pageFits = await page.evaluate(
    () => document.documentElement.scrollWidth <= innerWidth,
  );
  const contentFits = await page.locator('.tabcontentWrap').evaluate(
    element => element.scrollWidth <= element.clientWidth + 1,
  );
  expect(pageFits).toBeTruthy();
  expect(contentFits).toBeTruthy();
}

test('daily verse, chapter navigation, favorites and persistence', async ({ page }) => {
  const errors = [];
  const remoteRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {
    if (request.url().includes('execute-api')) remoteRequests.push(request.url());
  });

  await start(page);
  await page.locator('#verseOfTheDay .likeBtn').click();
  await expect(page.locator('#verseOfTheDay .likeBtn')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.locator('#favoritesTabBtn').click();
  await expect(page.locator('#favoritesTab .verse')).toHaveCount(1);

  await page.reload();
  await page.locator('#favoritesTabBtn').click();
  await expect(page.locator('#favoritesTab .verse')).toHaveCount(1);
  await page.locator('#homeTabBtn').click();
  await page.locator('#homeTab .btn').first().click();
  await expect(page.locator('#textTab .verse').first()).toBeVisible();
  await page.locator('#textTabBtn').click();

  const chapter = await page.evaluate(() => UI.currentChapter);
  await page.locator('#btnBack').click();
  expect(await page.evaluate(() => UI.currentChapter)).not.toBe(chapter);

  await page.locator('#favoritesTabBtn').click();
  await page.locator('#favoritesTab .likeBtn').click();
  await page.reload();
  await expect(page.locator('#favoritesTabBtn')).toBeHidden();
  expect(errors).toEqual([]);
  expect(remoteRequests).toEqual([]);
  await expectLayoutToFit(page);
});

test('save and cancel settings, dark theme and three translations', async ({ page }) => {
  await start(page);
  await page.locator('#settingsTabBtn').click();
  await page.locator('#colorTheme').selectOption('dark');
  await page.locator('#cancelBtn').click();
  await expect(page.locator('body')).toHaveClass(/light/);

  await page.locator('#settingsTabBtn').click();
  await page.locator('#colorTheme').selectOption('dark');
  await page.locator('#textLanguage2').selectOption('bo');
  await page.locator('#textLanguage3').selectOption('ar');
  await page.locator('#fontSize').selectOption('150');
  await page.locator('#saveBtn').click();
  await expect(page.locator('body')).toHaveClass(/dark/);
  await expect(page.locator('#verseOfTheDay .verse')).toHaveCount(3);
  await expectLayoutToFit(page);

  await page.locator('#settingsTabBtn').click();
  await expect(page.locator('#textLanguage2')).toHaveValue('bo');
  await expectLayoutToFit(page);
});

for (const language of ['en', 'ar', 'bo', 'zh-cn']) {
  test(`layout and navigation in ${language}`, async ({ page }, testInfo) => {
    await start(page, { uiLanguage: language, textLanguage: language });
    await expectLayoutToFit(page);
    await page.screenshot({ path: testInfo.outputPath(`home-${language}.png`) });

    for (const tab of ['text', 'settings', 'info']) {
      await page.locator(`#${tab}TabBtn`).click();
      await expect(page.locator(`#${tab}Tab`)).toBeVisible();
      await expectLayoutToFit(page);
    }
  });
}

test('small phone and landscape retain usable navigation', async ({ page }) => {
  await start(page);
  const viewports = [{ width: 320, height: 568 }, { width: 844, height: 390 }];
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const tab of ['home', 'text', 'settings']) {
      await page.locator(`#${tab}TabBtn`).click();
      await expectLayoutToFit(page);
    }
  }
});

const translationCombinations = [
  ['bo', 'en'],
  ['en', 'de'],
  ['bo', 'en', 'de'],
];

for (const languages of translationCombinations) {
  test(`parallel translations ${languages.join('+')}`, async ({ page }, testInfo) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await start(page);

    await page.locator('#settingsTabBtn').click();
    for (const [index, language] of languages.entries()) {
      const suffix = index ? index + 1 : '';
      await page.locator(`#textLanguage${suffix}`).selectOption(language);
    }
    await page.locator('#saveBtn').click();

    const dailyVerses = page.locator('#verseOfTheDay .verse');
    await expect(dailyVerses).toHaveCount(languages.length);
    expect(await dailyVerses.evaluateAll(nodes => nodes.map(node => node.lang))).toEqual(languages);
    for (const verse of await dailyVerses.all()) {
      await expect(verse).not.toBeEmpty();
    }

    // All loaded translations must align by chapter and verse, including the daily selection.
    const alignment = await page.evaluate(() => {
      const sets = [DATA.verses, DATA.verses2, DATA.verses3].filter(set => set.length);
      return {
        counts: sets.map(set => set.length),
        aligned: sets.every(set => set.every((verse, index) => (
          verse.chapter === sets[0][index]?.chapter
          && verse.nr === sets[0][index]?.nr
        ))),
        daily: sets.map((_, index) => {
          const verse = DATA.getVerseOfTheDay(index + 1);
          return [verse.chapter, verse.nr];
        }),
      };
    });
    expect(alignment.counts.every(count => count === alignment.counts[0])).toBeTruthy();
    expect(alignment.aligned).toBeTruthy();
    expect(alignment.daily.every(id => (
      JSON.stringify(id) === JSON.stringify(alignment.daily[0])
    ))).toBeTruthy();

    await expectLayoutToFit(page);
    // Verify the last translation is reachable by scrolling, not just present in the DOM.
    await dailyVerses.last().scrollIntoViewIfNeeded();
    await expect(dailyVerses.last()).toBeInViewport();
    await page.screenshot({ path: testInfo.outputPath(`daily-${languages.join('-')}.png`) });

    await page.locator('#verseOfTheDay .likeBtn').click();
    await page.locator('#favoritesTabBtn').click();
    await expect(page.locator('#favoritesTab .verse')).toHaveCount(languages.length);
    const favoriteLanguages = await page.locator('#favoritesTab .verse').evaluateAll(
      nodes => nodes.map(node => node.lang),
    );
    expect(favoriteLanguages).toEqual(languages);

    await page.locator('#textTabBtn').click();
    for (const language of languages) {
      await expect(page.locator(`#textTab .verse[lang="${language}"]`).first()).not.toBeEmpty();
    }
    await expectLayoutToFit(page);
    await page.screenshot({ path: testInfo.outputPath(`chapter-${languages.join('-')}.png`) });

    await page.reload();
    await expect(dailyVerses).toHaveCount(languages.length);
    await page.locator('#settingsTabBtn').click();
    for (const [index, language] of languages.entries()) {
      const suffix = index ? index + 1 : '';
      await expect(page.locator(`#textLanguage${suffix}`)).toHaveValue(language);
    }
    await page.locator('#colorTheme').selectOption('dark');
    await page.locator('#fontSize').selectOption('150');
    await page.locator('#saveBtn').click();
    await expect(dailyVerses).toHaveCount(languages.length);
    await expect(page.locator('body')).toHaveClass(/dark/);
    await expectLayoutToFit(page);
    await dailyVerses.last().scrollIntoViewIfNeeded();
    await expect(dailyVerses.last()).toBeInViewport();
    await page.screenshot({ path: testInfo.outputPath(`dark-large-${languages.join('-')}.png`) });
    expect(errors).toEqual([]);
  });
}
