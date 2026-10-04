# FarmPilot — two one-minute recording scripts

Combine your **approved one-minute Jiwoo/Kelvin introduction** with the following product demo and technical walkthrough: about **3 minutes total**, within the PDF's mandatory 2–5 minutes. The two new segments alone are about 2 minutes; use the introduction to avoid falling below the minimum after trimming. Record actual product actions; the scripts and a clickable demo are not substitutes for the uploaded video.

Jiwoo leads the demo. Kelvin leads the technical segment. Keep both visible in the introduction. Use the exact slogan: **“You grow the coffee. We help brew the ideas.”** Speak naturally, around 140–150 words/minute; rehearse once and trim pauses rather than rushing.

## Before you press Record — approximately five minutes

1. Open the existing working demo or the new private preview. For the complete ZIP, extract `FarmPilot/`, run `py -m http.server 8080 --bind 127.0.0.1 --directory public` on Windows (or `python3 ...`), then open `http://localhost:8080/offline/index.html`. The local demo does not confirm real online bookings.
2. Use demonstration data, never genuine guest identities. Export a backup first if you have work to preserve. Avoid clearing an existing business just for filming.
3. Open **My device** and choose **Install / check full AI · ~48 MB**; wait for readiness. The small core is compact fallback, not the semantic model used for the 37/42 comparison. Confirm the feedback panel says **Semantic AI** before claiming semantic matching.
4. In **Guest feedback → Insights and evidence**, prepare these exact synthetic comments for typing/pasting: **“We drove past the turning three times before finding the place.”** For the offline scene: **“A bench under a tree would help older visitors.”** These are authored development examples, deliberately used for a repeatable demo, not unseen customer evidence.
5. Rehearse adding each comment through **Add feedback**, marking the permission checkbox for this synthetic demonstration, and clicking **Save feedback**. Check **Finding the farm** / **Comfort and accessibility** in your own run. Do not claim a label you did not actually observe.
6. Prepare the plan text: **“Demo plan: send a picture of the junction before the next visit.”** For offline: **“Demo plan: assess a safe shaded resting place.”** If a theme already has an active plan, show/edit that plan or choose a theme without one; do not delete real work. Make a fresh plan for the recorded end-to-end scene when possible.
7. If demonstrating translation, install a language ZIP beforehand via **Load a language file**. Do not spend the one-minute demo downloading 200 MB. Optional translation is supporting scope; the required central workflow is feedback → approved improvement.
8. Prepare screen tabs: product; `README.md`; `docs/evaluation.json`; `lib/engine.ts`; `lib/server.ts`; `docs/training/`. Enlarge text so the recording is readable. No secrets or private records should be visible.

## Script 2 — product demo, approximately one minute

**Jiwoo — speak this:**

“Because of FarmPilot, Noor can choose and save one visitor-informed tour improvement during her weekend phone session instead of relying on memory; this working flow is our prototype evidence, not measured business impact.

Here are fictional guest comments. I add a new one about getting lost, and FarmPilot groups it with similar concerns. Noor opens the actual guest words, checks the finding, edits an arrival-card plan, and approves it. The coffee isn't the only thing getting smarter.

These controls also work in Kiswahili. Unclear comments go to a person.

After preparing the offline package, I reopen with the network disabled, add another comment, and save a new plan locally.

Visitor requests and translated replies support the business, but quotes require Noor's approval and the visitor's acceptance. Noor stays the pilot.”

### Exact screen actions

| Time in this segment | What you must do/show |
| --- | --- |
| 0:00–0:11 | Show producer workspace/demo label. State user, action, weekend timing, counterfactual and limited evidence. A short caption may read “Fictional feedback · prototype evidence.” |
| 0:11–0:21 | **Guest feedback → Insights and evidence → Add feedback**. Paste the junction comment, leave language English, select synthetic demonstration source, confirm permission and **Save feedback**. Show the new comment/theme. Use a jump cut to remove waiting, not to invent a result. |
| 0:21–0:32 | Open **Finding the farm** to display the actual excerpt/source/date. Type the demo plan, then **Plan this improvement**. Show it under **My improvements** with **Planned** status. This is the complete required business workflow. |
| 0:32–0:39 | Switch the outer workspace language to **Kiswahili** and show the translated improvement/control text; switch back. Briefly show an **Ask a person** example or add “Okay.” as a separate ambiguous synthetic comment. No automatic Swahili feedback understanding is claimed. |
| 0:39–0:53 | Show network disabled, close/reopen the installed app, then enter the NEW bench comment and save a NEW local improvement plan. Use a pre-recorded continuous clip and a readable “network disabled” caption; preserve enough footage to show real new input and a saved result. |
| 0:53–1:00 | Briefly show Visitor view or an enquiry/quote with pending status and the review/acceptance controls. Do not imply a sent SMS or a confirmed real booking. End on the saved plan or FarmPilot identity. |

**Offline truthfulness:** The ideal proof is the intended phone: prepare while connected, airplane mode, cold reopen, new input and new plan. If only desktop proof is available, caption **“Desktop offline demonstration; target-phone test pending.”** If you use browser DevTools network emulation, caption **“Browser network simulation; physical-phone test pending.”** If you cannot show new inference and saving offline, replace the offline sentence with: **“Our offline integrity and network-simulation checks pass; a physical-phone test is still pending.”** Show `docs/offline-validation.json`; do not stage a fake airplane-mode result.

## Script 3 — technical walkthrough, approximately one minute

**Kelvin — speak this:**

“Under the bonnet: React and TypeScript, local Transformers.js with quantized ONNX models, and a Worker with SQLite-style D1 for connected requests.

MiniLM groups paraphrases, beyond keyword counting. It scored 37 of 42 authored development cases versus 17 for keywords; that's development evidence, not field accuracy. Exact quotes, uncertainty and Noor's approval keep the human in charge.

The core is about 2.4 megabytes; fuller feedback AI, 48. Optional translation is much larger: six Marian directions adapted on licensed MASSIVE data and tested with FLORES. Sources, licenses and gaps are in our README.

Our weaknesses are synthetic feedback, translation errors and unmeasured phone performance. Time ruled out field trials and native-language review. Next: consented local data, Swahili reviewers and smaller models. For less-supported languages, start with reviewed phrases and human help. Localization means fitting Noor's language, device and control—not making her fit ours.”

### Exact screen actions

| Time in this segment | What you must show |
| --- | --- |
| 0:00–0:11 | Open source folders `app/`, `lib/`, `public/`, `drizzle/`. Show `lib/engine.ts` local model loading and `lib/server.ts` connected request rules. Avoid rapid scrolling through unreadable code. |
| 0:11–0:27 | Show README **Verification** table or `docs/evaluation.json`: 42 authored cases, semantic 37, keyword 17. Caption “Development suite · not field accuracy.” Return briefly to an exact evidence quote and human approval/uncertainty control. |
| 0:27–0:42 | Show README **AI design and size** and **Every build/evaluation dataset** tables. Highlight small core versus optional translation, MASSIVE CC-BY-4.0 and FLORES CC-BY-SA-4.0. A caption can name Kenya/2024 internet context; do not read the whole table. |
| 0:42–0:53 | Show README **Weaknesses/Time limits**, with phone testing, native review and synthetic data visible. If a translation scene was filmed, show original + edited draft + review checkbox; label it machine assistance, not guaranteed translation. |
| 0:53–1:00 | Show README localization/next-steps paragraph and the accessible GitHub/demo location. End on the team or the approved slogan. |

## Required items across the three-minute video

- Introduction: both names, Jiwoo researcher/frontend, Kelvin backend, target user's limited connectivity/shared phone, product identity.
- Demo: complete one meaningful Tourism workflow, new input, original evidence, human approval, weekend use, named **Kiswahili**, uncertainty, honest offline scope.
- Technical: actual AI method, simpler-tool comparison, development evidence with limits, stack, core/optional model sizes, cited data, weaknesses/time constraints/future model work, less-supported language and localization reflection.
- Caption/footer during technical data scene: **“Kenya reference context: WDI/ITU internet use 2024; WDI/UN Tourism tourism series 2019. Fictional farm, prices and comments.”** This avoids presenting national data as Noor-specific evidence.
- Short privacy caption when entering feedback: **“Permission required · local analysis · names need manual removal.”** README additionally discloses unencrypted shared-device storage and bias.
- Sources/licenses/complete limitations stay in README; they do not all need to be spoken in two minutes. The video should explicitly point to them.

## Submission sequence before 6:00 AM

Use this as a priority order, not a claim that these tasks are already done:

1. Download the small GitHub ZIP and recording guide first; use the already working demo while the full ZIP downloads.
2. Record introduction + both segments; combine into one 2–5-minute video if the form asks for one link. Check voice, readable screen, total duration and link permissions.
3. Upload the extracted source with folders intact, keep `README.md` at repository root, and check the repository opens for judges. The ZIP itself is a downloadable release asset, not a substitute for visible code.
4. Submit the required prototype/code link and video link. Open both in the access mode judges will use. Owner-private preview is not an anonymous public judge link; provide accessible code/offline instructions or arrange permitted access.
5. Confirm application/registration, all team eligibility and any submission-form requirements beyond the PDF. The PDF states age 18–35 and a prior application. Do not claim that generating this package submits the entry.

If time runs short, prioritize the required video and accessible source over optional translation/SMS/marketing demonstrations. Do not remove disclosures to imply validation that has not happened.
