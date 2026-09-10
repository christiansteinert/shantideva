# Project mapping and onboarding

- Date: 2026-09-07
- Status: completed
- Request: make the repository understandable to agents and human developers and maintain durable history.

## Changes and rationale

Inspected the shared web runtime, language and text assets, Cordova configuration and lock, Android/iOS plugin implementations, AWS service definitions, legacy scripts and iOS release CI. Created `docs/PROJECT_MAP.md`, `docs/DEVELOPMENT.md`, root `AGENTS.md`, this task history structure, and a new README entry point.

The map explains CONFIG/UI/DATA, initialization, storage, verse alignment, native notification differences and the release boundary. The development guide recommends Codex/CLI for the shared edit/test loop and Xcode for native debugging/signing. Task records use `tasks/YYYY-MM-DD-NN-name/README.md` and one line in `log.md`; a template makes the convention reusable.

## Verification

Documentation was checked against source and installed versions: Node 22.22.0, Xcode 26.6, Cordova iOS lock 7.1.1, Cordova Android 15.1.0. Consulted official Cordova iOS and OpenAI AGENTS.md documentation, linked from the development guide.

## Findings and follow-ups

Production XML, lock and CI disagree on iOS versions; release CI dynamically installs plugins and can publish on main/master pushes. These need a separate release reproducibility task. Native iOS notification code is primarily JavaScript; Objective-C is a stub. AWS defaults to production, so UI tests must use local isolation.
