# PR preparation

- Date: 2026-09-10
- Status: completed
- Request: assess merge difficulty, clean the change, squash it into one commit on a branch, and provide a copy-ready PR description.

## Changes and rationale

Reviewed the complete change against the current public `master` commit. Created branch `codex/modernize-ui-local-dev`. Replaced a recently introduced CSS alignment property with layout rules compatible with the app's older supported platforms, updated the current test count, and added a read-only pull-request workflow that runs the shared browser suite. Reduced committed visual evidence from 15 images (about 2.6 MB) to three curated before/after/dark images (about 145 KB); repeatable native and multilingual captures remain ignored test artifacts.

The combined change is mechanically easy to merge because public `master` still points to the exact base commit (`8bb653d6`) and the branch has no upstream divergence. Review complexity is moderate: the PR deliberately includes the UI refresh, the isolated development tooling needed to verify it, tests, and project documentation. Release signing, AWS deployment, translation content, and native Android implementation remain unchanged.

## Verification

- `npm test`: 30 passed across iPhone WebKit, Android-sized Chromium, and desktop Chromium.
- `npm run build:web`: passed.
- `npm run build:ios`: passed with Xcode 26.6 and local simulator signing.
- `node --check scripts/dev.mjs`: passed.
- `git diff --check`: passed.
- Public remote `master` verified at the local base commit through `git ls-remote`.

Earlier task records contain native simulator smoke checks and visual evidence. The new GitHub Actions workflow will independently rerun the browser suite on the PR.

## Review guidance

Review the PR in four layers: `src/web/` for user-facing behavior, `scripts/` and root npm files for local isolation, `tests/` plus CI for verification, then docs/history. Three curated before/after/dark images provide visual history at about 145 KB; redundant native and multilingual screenshots remain generated test artifacts. If the maintainer requires smaller conceptual changes, the fallback is two PRs: tooling/tests/docs first, followed by the visual refresh. Keeping them together makes the UI change immediately reproducible and testable.
