# Final validation and six-hour prioritization

A persuasive entry needs better evidence more than additional features.

| Remaining time | Work | Concrete output |
| --- | --- | --- |
| 30–45 min | Install on an existing lower-cost Android phone; prepare core and full profiles | Recorded cold-reopen, NEW feedback inference and NEW plan in airplane mode; actual device/OS/model load times |
| 30–45 min | Native Swahili reviewer checks instructions and action cards | Corrected wording, reviewer's consent and a short written localization reflection |
| 45–90 min | Tourism operator or relevant local reviewer tries the workflow | Consented observations, two usability issues and which suggested action was useful; do not call this an impact study |
| 30–60 min | Label 20–40 previously unseen, consented visitor comments BEFORE running inference | Theme labels, abstention/correction rates and direct comparison with keyword baseline |
| 45–60 min | Record and edit a 3–4 minute video | Required sections and a complete visible workflow |
| 15–30 min | Verify code/archive, judge access and submission fields | Source or accessible link, video, provenance and limitations |

## Actual phone test

Use a browser supporting WASM SIMD, service workers and CacheStorage. Record
phone model, OS/browser versions, free storage, installation time, model-load
time, analysis time for 1 and 25 comments, and observed battery change. Do not
infer minimum RAM from a desktop result. Repeat once after full browser closure.

1. Prepare core while connected; reopen without connectivity, add a new comment,
   manually correct uncertain analysis and create a plan.
2. Connect once; prepare full; wait for explicit Ready.
3. Enable airplane mode, fully close browser/app, reopen it, enter an original
   NEW comment and confirm semantic analysis rather than compact fallback.
4. Create a NEW improvement and save an observed outcome. Confirm it survives
   another closure/reopen.
5. Export a backup, restore on the same origin, and verify a human correction.
6. Try interrupted full download while a core package is installed; core should
   remain available. Keep sufficient temporary space for two full packages.

## Better evaluation

Define one main theme per sentence plus `unknown`, with an optional human tone
label, before testing. Recruit reviewers with consent and remove identifying
details. Freeze model/prototypes/thresholds before inference. Publish all errors,
coverage, accepted accuracy and unknown recall alongside overall accuracy; do
not tune on these cases and call them held out. Use disagreements to describe
limits. Business value needs longitudinal observation; a 1-hour test cannot
support a causal revenue claim.

## Security / privacy checks

The core inference and improvement workflow sends no feedback to an AI service.
The connected visitor forms intentionally submit consented operational records
to the request service. Use a real device's network inspector to verify that new
notebook entry, inference and local action planning work offline. Clear names and IDs manually, protect the
shared phone, and explain that export files are readable and not deleted by the
app's delete command. Do not collect private guest data just to improve a demo.

## Optional browser tools

The app feature-detects WebMCP and exposes read-only insights plus a feedback
form staging tool that cannot grant consent or save feedback. The permitted
preview browser reported no available WebMCP tools, so runtime tool validation
is unavailable. The previous 1.0 notebook interface was tested. The 2.0 interface could not be
verified in the interactive preview during this build; its browser review is
still pending. The normal user interface is the primary workflow. Do not claim tested WebMCP compatibility.
