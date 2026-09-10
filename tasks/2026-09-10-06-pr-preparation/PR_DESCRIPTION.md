# Modernize the shared UI and add repeatable local development

## What changed

This updates the shared Cordova interface with a calmer responsive design, improved typography, larger touch targets, safe-area support, dark mode styling, and clearer navigation. The same source continues to serve iOS, Android, and the browser, while preserving multilingual typography, RTL behavior, stored preferences, favorites, and translation content.

It also adds a repeatable local workflow for browser and iOS development:

- a loopback-only development server with production cloud writes disabled;
- isolated Cordova projects under `.local/` with a separate development bundle ID;
- commands to build and launch the iOS simulator through `xcodebuild` and `simctl`;
- Playwright coverage for reading, favorites, settings, responsive layouts, dark mode, and multilingual combinations;
- a pull-request workflow that runs the browser suite; and
- project, development, agent, and task-history documentation.

The legacy `ios-build.sh`, `ios-run.sh`, and `webapp-build.sh` entry points now delegate to the documented npm commands. Release signing, App Store upload configuration, AWS deployment, and translation text are unchanged.

## Validation

- `npm test` — 30 tests passed across iPhone WebKit, Android-sized Chromium, and desktop Chromium.
- `npm run build:web` — passed.
- `npm run build:ios` — passed with Xcode 26.6 and local simulator signing.
- Native smoke checks passed on iPhone SE with iOS 18.2 and iPhone 17 Pro with iOS 26.5 for the daily verse, chapter reading, favorites, and settings.
- Tibetan + English, English + German, and Tibetan + English + German were verified for alignment, order, persistence, favorites, scrolling, dark mode, and enlarged text.

## Review notes

The PR is based directly on current `master`. The main cross-platform risk is the shared stylesheet; the browser matrix and iOS simulator checks cover it. Native Android packaging, physical-device signing, APNs delivery, and backend deployment were not exercised.

Three curated before/after/dark images are recorded under `tasks/2026-09-07-03-visual-refresh/`; repeatable multilingual verification is documented under `tasks/2026-09-07-05-multiple-languages/`.
