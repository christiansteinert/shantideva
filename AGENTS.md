# Working in Shantideva

Read [docs/PROJECT_MAP.md](docs/PROJECT_MAP.md), [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md), and the recent entries in [log.md](log.md) before changing the app.

## Source and scope

- Edit the shared app in `src/web/`. iOS is the first validation target; keep web and Android support intact.
- This is Cordova + vanilla JavaScript + jQuery UI. Do not introduce a platform rewrite for a visual task.
- Never edit generated `.local/`, `platforms/`, `plugins/`, or copied `www/` as the final fix. Change source or `scripts/dev.mjs`, then regenerate.
- Preserve localStorage keys, chapter/verse alignment, translations, attribution, RTL behavior, and Tibetan/Sanskrit font support.
- Keep release bundle IDs, Android SDK preferences, signing, and production service configuration separate from local development.

## Working loop

1. Inspect `git status` and relevant code. Preserve unrelated changes.
2. Use `npm run dev` for rapid shared UI iteration; it serves source at `http://127.0.0.1:4173` with production cloud writes disabled.
3. Run `npm test` after meaningful app changes. Add behavior coverage when fixing a bug. Inspect screenshots for visual changes; passing layout assertions alone does not establish visual quality.
4. For iOS changes, run `npm run build:ios` and `npm run run:ios`. First-time setup is `npm run setup:ios`. Use Xcode via `npm run open:ios` for native debugging/signing.
5. Report which platforms actually built and ran. Browser device emulation is not a native Android/iOS test. Simulator launch is not APNs delivery validation.
6. End with a reviewable diff, test outcome, and updated task history.

## Durable task history (required for every meaningful task)

Create `tasks/YYYY-MM-DD-NN-short-name/README.md` with date, request, changes and rationale, files involved, verification/results, limitations and follow-ups. Put relevant small screenshots/evidence there; keep large build artifacts in ignored `.local/` or `test-results/`. Add one dated line linking to the task in root `log.md`. Update a task's existing record while it is in progress; do not log every shell command as a separate task. Use local calendar dates and never fabricate test results.

## Environment and external effects

Use the pinned Node major in `.nvmrc` and `npm ci` for lockfiles. Xcode, simulator access, CocoaPods, package downloads, browser launches and localhost ports may need execution outside the Codex filesystem sandbox; request the relevant tool escalation if access fails. Do not interpret a sandbox error as proof that Xcode or a simulator is missing.

Normal local work does not need Apple signing credentials or AWS access. The existing `build-ios.yml` can upload to App Store Connect on main/master pushes, and `src/aws/serverless.yml` defaults to production. Do not run release/deploy commands or push to a publishing branch as part of a local task unless explicitly requested. Keep secrets, provisioning profiles, signing keys, and generated artifacts out of commits.
