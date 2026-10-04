# FarmPilot 3.0.2 deadline patch

4 October 2026. Continues supplied 3.0.1 TypeScript source; no retraining or new installers claimed.

- Fixed visitor clarification leaking operator-only translation audit metadata; a regression check verifies owner retention and visitor filtering.
- Replaced machine-specific translation archive path with repository-relative default and optional `FARMPILOT_LANGUAGE_ARCHIVES` override.
- Added hash-checking language ZIP generator, available through `pnpm models:archives`.
- Made `pnpm build` refresh offline UI first to prevent website/offline source drift.
- Added explicit owner-private preview fallback; public/shared deployments still need `NOOR_OWNER_ID` and must remove the fallback.
- Updated stale feedback-page copy to distinguish message translation from human review of non-English feedback.
- Added full GitHub README report, challenge matrix, citations, gaps, limitations, two timed scripts and upload instructions.

Checks: 15 workflow, 21 service, 16 translation/cache/archive, 3 desktop security; 42-case AI evaluation and 11 FAQ cases; offline integrity/network simulation; TypeScript/lint/build. Pack hashes and supplied partition ID separation are checked. Translation scores remain inherited from original records. Phone/native/field validation remains pending.

Original owner-private Site was unavailable in this workspace. A new private preview continues the recovered source; original Site/records were not modified. No private operational database or provider credentials are included.
