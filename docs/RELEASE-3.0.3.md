# FarmPilot 3.0.3

Restores the missing `app/` and `public/` folders in the GitHub upload. The repository now includes the prebuilt offline demo, quantized English feedback model, runtime, source, report, data citations and model documentation.

The Vercel configuration builds a static demo directly from repository assets, verifying all 23 offline-manifest entries before publication. It does not fetch assets from another hosted site during deployment.

A version-tag workflow creates a downloadable static ZIP, report, video scripts and SHA-256 checksums. GitHub also supplies the tagged source archive. Optional Swahili, French and Spanish translation ZIPs are uploaded separately as release assets.

## Strengths and limits

- Evidence excerpts, editable themes, operator approval and local feedback/plan storage remain available.
- The static demo stores data on the current device. It does not run the Cloudflare booking database or SMS service.
- Existing model accuracy results are development results; no new field or native-speaker validation is claimed by this packaging release.
- Native installers are separate builds. A complete multilingual desktop build requires restoring all optional model ZIPs first. Installer signing, target-device performance and field impact remain future work.

Validation: all offline asset lengths and SHA-256 hashes checked; workflow, service, translation and desktop protocol tests run locally for this release. Hosted browser installation still requires separate end-to-end verification.
