# Noor Fieldnotes 2.0

This release extends the original offline feedback notebook with a visitor
experience page, bounded FAQ assistant, visit requests, human-approved quotes,
visitor acceptance, capacity checks, consented feedback, testimonial approvals,
listing exports, discovery-source counts and a weekend review workspace.

## What runs locally

The Windows and macOS applications bundle the complete interface, compact model,
quantized MiniLM weights, tokenizer, WASM runtime, licenses and illustrative
image. No account or AI API key is needed for the local demonstration. All
local visitor requests are clearly marked test records. Desktop network access
is blocked by design; these installers do not host an internet booking service.

Feedback analysis, human corrections, approved improvement records, business
drafts, listing exports and the demonstration approval workflow work locally.
The household smartphone remains the challenge's target device: desktop
installers are additional distribution formats, not evidence of phone support.
Use the HTTPS PWA while connected for initial phone setup. Ordinary SMS-only
phones cannot run the local model. Browser storage is unencrypted and can be
evicted; export a backup and verify the actual phone in airplane mode.

## Hosted request service

The Site includes a D1-backed API. Production migrations are in drizzle/.
Published business facts, requests, feedback and newsletter permissions persist
on the service. Feedback inference remains on the operator device. Publishing
uses optimistic revision checks. Quote acceptance rechecks capacity atomically,
including overlapping activities. A quote is not a confirmed visit until the
visitor accepts the exact current revision. Quotes expire after 48 hours.

The existing Site audience remains owner-private. /visit is the visitor view
within that audience. The owner must explicitly grant appropriate access or
deploy an appropriately secured public host before accepting external visitors.
Operator endpoints require NOOR_OWNER_ID and trusted, authenticated identity
headers supplied by Sites. Do not expose these endpoints behind an arbitrary
proxy that accepts user-supplied oai-authenticated-user-id headers.

Offline drafts do not silently replace server facts. New live requests,
publication, provider SMS and campaign delivery require connectivity. If an
update conflicts, refresh, review and approve it again. Device backups do not
replace or delete server records. Backup files contain contacts and request
keys: keep them private.

## SMS

The app includes a labeled local SMS demonstration and an optional Twilio
adapter. No live SMS has been sent. To enable the adapter, configure runtime
secrets TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER,
NOOR_OPERATOR_PHONE and NOOR_PUBLIC_ORIGIN. Verify country-specific two-way
support, costs, sender registration and permission before provisioning.

The signed webhook is /api/noor/sms. It needs a publicly reachable endpoint;
the default private Site gate does not allow an external provider webhook.
Requests are authenticated with the provider signature and the configured
operator phone. Replies use APPROVE CODE REVISION or DECLINE CODE REVISION.
An approval creates a quote; the visitor still accepts it. Stale replies fail.
Provider submission is not evidence of delivery or of a human reading it.

Email/SMS visitor contact preferences are stored, but automatic email delivery
and campaigns are not enabled. The private request key provides status and
quote acceptance on the website. Newsletter collection is separate opt-in.
Do not start campaigns until an appropriate delivery/unsubscribe service is
configured. Payment processing and direct marketplace synchronization are
outside this release.

## AI and language scope

MiniLM is reused for English feedback themes and semantic FAQ matching. It is
not fine-tuned in this release. The compact English classifier is a fallback
that abstains frequently. Tone is a transparent, editable word-cue heuristic.
Suggested actions are templates, not guaranteed business recommendations.
Guest quotes are exact sanitized excerpts. Calculations and booking state
changes are conventional software with explicit human decisions.

English and Swahili interfaces and fixed business messages are included.
Swahili FAQ matching uses reviewed phrase patterns; this is not an open-ended
translation model. Swahili feedback is referred for human classification.
Native Swahili review, less-supported-language testing and real visitor
validation remain pending. All default records, prices and the location are
fictional. The hero image is an original AI-created concept illustration and
is labeled accordingly; it is not a photograph of Noor's farm.

## Checks and limits

- TypeScript and production build checks.
- State-machine workflow checks in docs/workflow-validation.json.
- Actual API handler with generated migrations and a SQLite D1 adapter in
  docs/service-validation.json, including competing quote acceptance.
- Existing 42 authored AI development cases in docs/evaluation.json; these
  are not independent field accuracy results.
- Actual offline assets and simulated CacheStorage/network checks in
  docs/offline-validation.json.
- Desktop custom-origin protocol and exact asset SHA-256 checks, including
  files extracted from the completed Windows installer and both DMGs.
- Thirteen Mach-O files in each Mac bundle have matching embedded code-page
  hashes. This does not validate Apple trust policy or native launch.
- Artifact SHA-256 values and build limits in docs/package-validation.json.

Interactive browser preview was unavailable in the build session. Real phone
airplane-mode tests, native Windows/Mac installation and launch, OS trust
checks, battery/RAM measurements and field validation remain pending.

The Windows installer is unsigned. Mac builds are ad hoc signed, without an
Apple Developer ID or notarization. Operating systems may show trust warnings.
No OS security settings are changed by this application.

## Submission

Provide code or a judge-accessible prototype and the mandatory 2–5 minute
video. A strong demonstration is: visitor feedback -> airplane mode -> exact
evidence and recurring wishes -> Swahili review -> operator-approved improvement
-> an accurate listing draft. Demonstrate requests and human approval as a
supporting flow. A script does not replace the recorded video.
