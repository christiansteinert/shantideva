# Shantideva

A multilingual reader for Shantideva's *Engaging in Bodhisattva Behavior* (Bodhicharyavatara), with a daily verse, full chapters, favorites, parallel translations, and reading preferences. One HTML/CSS/JavaScript app supports the browser, iOS, and Android through Apache Cordova.

## Start here

- [Project map](docs/PROJECT_MAP.md): architecture, source directories, data flow, native plugins and backend.
- [Local development](docs/DEVELOPMENT.md): build, run, test, iOS Simulator and Xcode/Codex workflow.
- [Agent instructions](AGENTS.md): source boundaries, verification and history requirements.
- [Task log](log.md): one dated entry per task, linked to detailed records and evidence.

## Run and test

Requires Node 22. Run from the repository root:

```sh
npm ci
npx playwright install chromium webkit
npm run dev
```

Open [the local app](http://127.0.0.1:4173). Edit `src/web/`, then reload. In another terminal:

```sh
npm test
npm run build:web
```

For iOS on a Mac with Xcode, an installed iOS simulator and CocoaPods:

```sh
npm run setup:ios
npm run build:ios
npm run run:ios
# Optional native debugging:
npm run open:ios
```

Use Codex for shared UI editing and repeatable command-line tests/builds. Use Xcode for native debugging and signing. Local native projects live in ignored `.local/`, use a separate development bundle ID, and do not overwrite release configuration. Local browser and iOS development disable production cloud synchronization.

The shared UI has browser coverage for iPhone WebKit, Android-sized Chromium and desktop Chromium. Native Android, physical-device signing and production push delivery require separate validation; see the [development guide](docs/DEVELOPMENT.md).

## Licensing

The original application's source code is released under GPL v2 or GPL v3, at your choice. Bundled libraries and fonts have their own licenses. Copyright in the included Shantideva translations belongs to the respective translators; translations are not released under the app's GPL license. Preserve translator credits and license notices.
