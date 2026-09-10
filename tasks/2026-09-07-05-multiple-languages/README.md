# Requested parallel-language testing

- Date: 2026-09-07
- Status: completed
- Request: test Tibetan + English, English + German, and Tibetan + English + German, in that order.

## Changes

Added three parameterized behavior tests in `tests/app.spec.mjs`, run on all three configured browser projects. No application code or translation data needed changing.

## Results

Command: `npm test -- --grep 'parallel translations'`

**9 passed (8.0 seconds):** each requested combination on iPhone WebKit, Android-sized Chromium and desktop Chromium.

For every combination the tests selected languages through Settings and saved them; verified daily language count/order and nonempty text; checked chapter/verse identifiers align across all loaded translation records and the daily selection; verified favorites show all chosen languages; opened chapter text; reloaded and checked settings persistence; tested dark mode and 150% text; checked horizontal bounds and that the last translation is reachable by scrolling. No JavaScript errors occurred.

Visually inspected generated iPhone WebKit screenshots for Tibetan glyph rendering, German wrapping, triple-language chapter headings, and enlarged dark-mode text. These repeatable test artifacts remain ignored rather than being committed. Long readings extend vertically and require scrolling; this is expected. The tests check reachability rather than requiring all translations to fit at once.

## Scope

These are browser-engine integration tests, including mobile WebKit, not an automated native simulator suite or a linguistic assessment of translation accuracy. The native iOS picker was additionally checked to expose Tibetan, English and German and allow Tibetan/English selection; the three complete save/reload flows were verified in the browser suite. The simulator was returned to its original English reader without saving the temporary selections. The focused run added nine passing checks; the complete 30-case suite was rerun during PR preparation.
