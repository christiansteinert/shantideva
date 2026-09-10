# Repeatable local development environment

- Date: 2026-09-07
- Status: completed
- Request: let humans and Codex build, run and test the app locally, with iOS first and web/Android preserved.

## Changes and rationale

Added root npm scripts and lockfile, Node 22 version file, local server, static web build, isolated native project generation, Xcode simulator build/launch commands, environment doctor, and Playwright setup. Updated legacy iOS/web shell entry points to call these commands. Generated artifacts and browser reports are ignored.

The local native bundle is `de.christiansteinert.shantidevaverses.dev`; release XML, package lock, release signing and AWS configuration are unchanged. Local assets inject `SHANTIDEVA_LOCAL_DEV`, skipping frontend favorite cloud uploads and iOS push subscription calls. Fixed the browser fallback favorite method's wrong callback signature and recognized Cordova's `app://localhost` startup origin.

## Verification and troubleshooting

- Installed original mobile dependencies with `npm ci` and browser test dependencies using the root lock.
- Installed Chromium/WebKit test engines and CocoaPods 1.17.0 via Homebrew (with its Ruby dependency).
- Local server runs at `127.0.0.1:4173`; static web build succeeded.
- 21 Playwright tests passed on iPhone WebKit, Android-sized Chromium and desktop Chromium; includes 320px/landscape navigation.
- Xcode 26.6 simulator build succeeded using Cordova iOS 7.1.1 and the iOS 26.5 SDK, with local ad-hoc signing (no Apple account).
- Cordova's default simulator discovery selected an unusable target; replaced that step with direct `xcodebuild` and `simctl` in the permanent script.
- The first failed local-path platform installation truncated a dependency's Cordova JS bridge. Restored with the original `npm ci`, recreated the disposable native project from the registry's exact version, and added a generated bridge validity check to `prepare()`.
- iOS 18.2 iPhone SE: installed/launched successfully; visually verified daily verse, chapter reading, favorite creation and the favorites view, and settings display using Simulator. The final build uses Xcode “Sign to Run Locally” instead of relying on a bare linker signature.

- iOS 26.5 iPhone 17 Pro: final ad-hoc signed build installed/launched and visibly rendered the daily verse and settings correctly. Earlier runtime stalls resolved after restarting the test simulators and using the final build; no claim is made that signing alone caused or fixed the stalls.
- Final `npm run build:web` succeeded; checked expected assets and confirmed local-development mode was not injected into production static output. `git diff --check`, script syntax and documentation links passed.
- Native checks are a smoke test of rendered screens and taps. The broader automated behavior/layout matrix runs in browser engines; native gesture, accessibility and notification coverage remains a separate validation layer.

## Limits

Native Android toolchain/build, physical-device signing, APNs, backend delivery and release CI are not certified. Shared Android UI is browser tested. Existing Cordova native deprecation/deployment-target warnings remain; platform upgrades need a separate release compatibility task.
