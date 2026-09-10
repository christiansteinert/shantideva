# Local development

Use Codex for the everyday edit/build/test loop and Xcode for native inspection, breakpoints, physical-device signing, and distribution. Both operate on the same generated Cordova project. Keep application edits in `src/web/`; Xcode's copied web assets are overwritten by prepare.

This recommendation follows this project's shared-web architecture and the locally tested CLI path. Cordova documents both CLI and Xcode simulator workflows in its [iOS platform guide](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/). Root [AGENTS.md](../AGENTS.md) provides durable agent instructions using [OpenAI's documented convention](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

## First-time setup

```sh
# From the repository root; Node 22 (nvm use if you use nvm)
npm ci
npx playwright install chromium webkit
npm run dev
```

Open http://127.0.0.1:4173. Edit source, then reload. No bundler, API key, cloud account, or frontend compilation is needed. `PORT=4174 npm run dev` selects another port; automated tests use 4173. The server binds only to loopback, prevents serving paths outside `src/web`, disables caching, and injects local development mode. Do not open `index.html` using `file://`; Cordova startup and AJAX require the appropriate runtime/origin.

```sh
npm test                  # All three browser projects
npm test -- --project=iphone-webkit
npm run test:ui            # Interactive Playwright runner
npm run build:web         # Production-style static output in app/shantideva-web/
```

The static build retains normal app cloud behavior; use `npm run dev` for isolated testing. Browser screenshots/traces are under `test-results/`, and the HTML report is under `playwright-report/`. The suite checks daily reading, chapter navigation, adding/removing favorites and persistence, saving/canceling settings, light/dark themes, font enlargement, parallel translations, and multilingual navigation/layout. External network requests are blocked in tests.

## iOS simulator

Prerequisites: macOS, Xcode with command-line tools selected and at least one installed iOS simulator runtime, Node 22, and CocoaPods. This machine already has Xcode 26.6 and multiple iOS runtimes; CocoaPods was installed during setup.

```sh
xcode-select -p
xcodebuild -version
xcrun simctl list devices available
pod --version
# If missing on another Mac: brew install cocoapods
npm run setup:ios
npm run build:ios
npm run run:ios
```

`setup:ios` installs the original project's locked dependencies if missing, derives a development configuration, adds the exact installed Cordova iOS version (7.1.1 at inspection), links the custom plugin, and prepares assets. It creates `.local/cordova/` with bundle ID `de.christiansteinert.shantidevaverses.dev` and display name **Shantideva Dev**. This can coexist with the release app and has separate storage. Production XML, lockfile and release identity stay intact.

`build:ios` prepares shared assets and runs `xcodebuild` for a generic iOS simulator with local ad-hoc signing (no Apple account or provisioning profile). Output: `.local/derived-data/Build/Products/Debug-iphonesimulator/Shantideva Dev.app`. `run:ios` also builds, reuses a booted iPhone (or chooses one from the newest installed runtime), boots it, installs, launches, and opens Simulator. To select a particular installed simulator:

```sh
IOS_SIMULATOR_ID=<UDID-from-simctl> npm run run:ios
```

Direct `xcodebuild`/`simctl` avoids Cordova 7's outdated default simulator selection. Prepare reports that the Podfile has no dependencies; this is expected for the local plugin set. The local iOS build uses an `app://localhost` origin so WKWebView can fetch bundled translations without the release CI's XHR workaround plugin. Existing release origins and storage migration behavior are not changed.

```sh
npm run open:ios           # Prepare assets and open the generated Xcode workspace
```

In Xcode choose **Shantideva Dev** and an iPhone simulator, then Run. After editing source, rerun `npm run build:ios` or `npm run open:ios` to refresh copied assets. For a physical device, configure your signing team in a separately reviewed development setup; the CLI uses local ad-hoc signing for simulators.

## Verified on this machine (2026-09-07)

- Static web build succeeded; 30 Playwright tests passed across three browser configurations.
- Xcode 26.6 / iOS 26.5 SDK simulator build succeeded with local ad-hoc signing.
- Installed and ran on iPhone SE (iOS 18.2) and iPhone 17 Pro (iOS 26.5). Native smoke checks covered daily/chapter text, favorites and settings display. This is not a full native gesture/accessibility suite.
- Screenshots and troubleshooting are linked in [task 02](../tasks/2026-09-07-02-local-development/README.md) and [task 03](../tasks/2026-09-07-03-visual-refresh/README.md).

## Android and web compatibility

All UI changes are shared. `npm run setup:android`, `npm run build:android`, and `npm run run:android` provide isolated debug workflows using the existing locked Cordova Android version (15.1.0), without invoking the old release signing script. Native Android additionally requires a compatible JDK, Gradle, Android SDK/build tools and an emulator/device. These commands are available but native Android setup/build was not established in this task; Chromium at an Android viewport verifies only the shared UI.

The existing `android-build.sh` and `android-run.sh` retain historical Linux/release assumptions. Avoid them for normal local development. `ios-build.sh`, `ios-run.sh`, and `webapp-build.sh` now delegate to the supported root commands.

## Local isolation and limitations

`SHANTIDEVA_LOCAL_DEV` is injected only by the local server and generated native dev assets. It skips frontend favorite uploads and iOS push subscription changes. Normal localStorage behavior and the plugin bridge remain active. The production push plugin is intentionally absent from local setup. APNs, notification permission prompts, backend registration and delivery need a separate device/integration test with an explicitly selected backend.

Use `npm run doctor` for a diagnostic inventory. Missing Android tools do not block browser/iOS work. If Codex reports `EPERM` binding localhost or fails connecting to CoreSimulator, retry with the execution tool's appropriate permission escalation: this machine's sandbox restricts those services. Do not disable sandboxing globally or store credentials in the repo.

The `.local/` directory is disposable generated state, but deleting it removes build outputs; simulator app data persists independently. Rerun setup after removing generated projects. Refresh a changed native plugin installation with a deliberate remove/add in the local project; do not edit the generated copy.

## Release boundary

The existing GitHub iOS workflow signs and uploads to App Store Connect when pushing main/master. It is a release workflow, not a PR check. This task neither runs it nor proves its dynamic plugin versions/signing are valid. AWS deployment defaults to `prd`. See the project map before release/backend work.
