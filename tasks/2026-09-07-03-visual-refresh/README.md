# Shared interface visual refresh

- Date: 2026-09-07
- Status: completed
- Request: give the app a modern overall look after establishing a testable environment.

## Changes and rationale

Added `src/web/css/modern.css` after the original stylesheet and jQuery UI theme. Introduced warm paper/surface colors, green accents, a readable serif daily verse, a framed reading area, roomier settings controls, 44px primary touch targets, rounded navigation states, a coordinated dark theme and safe-area spacing. Preserved the bundled language typography and RTL rules. Viewport settings now allow zoom.

Updated shared markup with a localized daily heading, favorite accessible labels/state, and current navigation state. Hiding an empty favorites tab now hides its containing item too, preventing a gap. Corrected the original tab-show behavior to retain the new flex layout. All changes apply to browser, iOS and Android; translations and chapter data were not edited.

## Verification

21 Playwright checks passed across iPhone WebKit, Android-sized Chromium and desktop Chromium. Covered daily verse/chapter navigation, favorite add/remove/persistence, save/cancel, dark theme, 150% text, simultaneous English/Tibetan/Arabic, English/Arabic/Tibetan/Chinese navigation, and narrow/landscape layouts. Added bounds checks after a visual check caught a clipped navigation bar. Local tests assert no AWS requests during favorite changes.

Visually inspected light/dark home screens and settings at 390×844. Curated evidence: [before](before.png), [after](after.png), and [dark](dark.png). Browser test screenshots and traces are generated under ignored `test-results/` and `playwright-report/`.

Verified native chapter reading, favorite creation/view, and settings display on iOS 18.2 and iOS 26.5 simulators. See task 02 for the precise native test scope.

## Follow-ups

This is an initial shared UI pass. A production accessibility audit, native Android packaging and push delivery remain separate work. The original bundled icons are retained; no new art or translation licensing changes were introduced.
