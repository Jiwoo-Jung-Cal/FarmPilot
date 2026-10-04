# FarmPilot

**You grow the coffee. We help brew the ideas.**

World Bank Small AI for Development Hackathon · **Track C: Tourism** · Version 3.0.3 · 4 October 2026

FarmPilot helps a small tourism operator turn scattered guest feedback into one practical, human-approved improvement. The central workflow is **feedback → local analysis → original evidence → human correction → approved plan → recorded observation**. A visitor website, controlled booking requests and optional local translation support that workflow.

**Submission status:** prototype, editable source, report and recorded videos prepared. Public static demo: https://farm-pilot-five.vercel.app/offline/index.html. Submission acceptance is pending the organizers’ decision. Target-phone, native-speaker and field-impact validation remain outstanding. This README is the GitHub report; it does not substitute for the videos or field validation.

## Quick links

Version 3.0.3 restores missing GitHub source/public folders and adds a self-contained Vercel static build plus tagged releases. See [publication instructions](docs/PUBLISH.md) and [release notes](docs/RELEASE-3.0.3.md). Optional language model ZIPs belong in GitHub Releases; the base repository includes the full English feedback model and runtime.


| Goal | File |
| --- | --- |
| Record the submission | [Two one-minute scripts and exact screen actions](docs/VIDEO_SCRIPTS.md) |
| Upload the source | [GitHub instructions](docs/GITHUB_UPLOAD.md) |
| Inspect models/data | [Feedback model card](docs/model-data-card.md), [translation card](docs/translation-data-card.md), [training evidence](docs/training/) |
| Review fixes | [Release 3.0.2](docs/RELEASE-3.0.2.md) |

**Team:** Jiwoo — researcher and frontend designer, first-year computer science student at UC Berkeley. Kelvin — backend designer. Jiwoo studied the scenario's connectivity, shared-device and feedback constraints; Kelvin designed the logic/data flow connecting analysis, saved decisions and improvement plans. Both record the video.

## Problem, user and counterfactual

The supplied brief describes Noor, a fictional 38-year-old smallholder with six or seven farm visitors a month through word of mouth. She has a calls/messages/mobile-money handset, occasional access to her daughter's smartphone on weekends, no household Wi-Fi and purchased 3G data. A basic handset cannot execute these models. The intended existing device for local AI is the borrowed smartphone; computers provide an additional distribution route.

**One-sentence outcome:** Because of FarmPilot, Noor can choose and save one visitor-informed tour improvement during her weekend phone session that she would otherwise choose from memory; our evidence is the functioning feedback-to-approved-plan demonstration and traceable development predictions, while real time savings and business impact still need a field test.

Without AI, Noor can still list her business and keep a spreadsheet. Those are valuable conventional digital services. Our proposed AI benefit is grouping differently worded comments, finding recurring concerns and keeping the exact supporting evidence. A listing, SMS, keyword search or spreadsheet alone does not perform that semantic comparison automatically. At very low review volumes, manual reading may suffice and remains available.

Noor's weekend routine: read consented feedback, inspect one theme, correct errors, choose a feasible improvement, save a plan, then record what happened. A family member/helper may assist with setup and backup. Digital literacy, affordable installation, trusted local support and an accurate listing remain prerequisites; AI cannot remove those constraints.

## Implemented product

### Operator

- Today, experience facts, enquiries/visits, feedback, improvements, listing/referral exports, weekend review and device settings.
- Twenty-four explicitly fictional demo comments; single/batch entry, consent, duplicate filtering and partial email/phone redaction.
- Six themes: hands-on experiences; stories/explanations; finding the farm; comfort/accessibility; timing/pace; price/expectations.
- Original sanitized excerpts with source/date and character offsets; ambiguity/unsupported content deferred to a person; human corrections retained.
- Fixed editable improvement templates with explicit planning, start and outcome actions. Historical observations are descriptive, not proof of causal revenue gains.
- English and **Kiswahili (Swahili)** controls/action copy, bilingual reviewed visitor facts, local export/backup/restore and deletion.

### Visitor and booking

`/visit` uses the farm's business identity rather than the producer slogan. Visitors read approved facts, ask bounded factual questions, select activities, request a visit, inspect an operator-approved quote, explicitly accept it and submit feedback after completion.

The default farm, location, AI-created illustration and KES rates are fictional. Three example activities total 90 minutes and KES 1,200/person; two guests estimate KES 2,400. Real prices, directions, contact and accessibility require operator approval.

A request is not a booking. The operator approves a quote revision; the visitor accepts that exact current revision within 48 hours. The service rejects stale decisions and checks overlapping capacity atomically. Online confirmation/publication require connectivity. Offline demo requests never confirm authoritative internet bookings.

FAQ responses use bounded matching and approved facts. Availability, safety, food, discounts and unusual arrangements go to Noor. Online feedback requires a completed visit's private key, with one submission per visit. Analysis, public-testimonial and newsletter permissions are separate. Testimonials also require operator approval. No campaigns are sent automatically.

### Local multilingual communication

Six Marian/OPUS-MT directions provide English↔Swahili, English↔French and English↔Spanish. Other pairs pivot through English. Noor keeps the original message visible, translates it for reading, writes a reply in her language, translates/edits it, optionally back-translates, confirms review and applies it. A separate operator action saves a response or quote. Translation does not send a message or approve a booking.

Number/date/time and currency-code mismatches raise warnings and block applying outgoing drafts until corrected. They do not guarantee semantic equivalence. Operator records retain original drafts, languages, model labels and review time; visitor responses omit that private audit. The 3.0.2 clarification fix extends this protection to visitor follow-ups.

## AI design and size

| Component | Method / size | Role and limits |
| --- | --- | --- |
| Semantic feedback/FAQ | Reused all-MiniLM-L6-v2, 384-dimensional embeddings, q8 ONNX; **22,972,370-byte weights** | No fine-tuning; compares text to 48 theme and 18 FAQ references. English analysis; similarity is not probability; pretrained text is not locally validated tourism data |
| Compact fallback | TF-IDF unigrams/bigrams, sublinear TF, L2 normalization, class-balanced logistic regression; 789 features; **73,516 bytes** | Six themes plus other; trained on 72 synthetic sentences; conservative, low accepted coverage |
| Message translation | Six pinned, adapted Marian encoder–decoder transformers, q8 ONNX; **132–141 MiB/direction** | One model in memory at a time; English-pivot errors; 1,000-character input/256-token output limits |
| Tone/actions | Transparent word-cue heuristic and fixed editable templates | Conventional code; no validated neural sentiment or autonomous business decision system |

Semantic threshold 0.37/margin 0.045, compact probability threshold 0.40/margin 0.07, and coverage/out-of-scope gates cause abstention. FAQ uses 0.52/margin 0.045. These are development choices, not calibrated safety guarantees. Non-English feedback is preserved for human review; message translation does not imply multilingual feedback classification.

Hosted core is about **2.38 MB**; complete feedback client/model/runtime about **48.13 MB**. Optional translation files total **853,316,380 bytes**, before shared runtime/compression. The multilingual bundle is not a tiny download. Direction packs are optional, versioned and hash-verified for sideloading. Low-end-phone storage, RAM, battery and speed have not been measured.

## Data grounding and citations

### Problem data: country and year

Kenya/Swahili is a reference design choice, not a location assigned by the fictional brief. Stored [WDI snapshots](docs/training/) show:

| Source / country / observation year | Value | Supports / does not cover |
| --- | --- | --- |
| World Bank WDI/ITU IT.NET.USER.ZS · Kenya · 2024 | 34.97622513% population using internet | Inclusion context; not smartphone ownership, local coverage, women's access or Noor's household |
| WDI/UN Tourism ST.INT.ARVL · Kenya · 2019 | 2,049,000 international arrivals | Historical tourism scale; not current farm demand, rural distribution, employment or return visits |
| WDI/UN Tourism ST.INT.RCPT.CD · Kenya · 2019 | US$1,762,000,000 receipts | Historical economic context; not income reaching Noor or measured product impact |

These are dated stored observations, not today's tourism figures. UN Tourism is WDI's upstream source, not an independent second sample. [Exact URLs/hashes](docs/training/source-manifest.json) preserve provenance. The brief grounds the shared-phone and informal-tourism scenario. Country aggregates cannot establish those household assumptions.

### Every build/evaluation dataset

| Dataset / source | License / size used | Role | Missing coverage / bias |
| --- | --- | --- | --- |
| Project-authored training and theme references | MIT; 72 synthetic sentences: 48 tourism + 24 out-of-scope; 48 theme references | Compact training and semantic references | Narrow developer-authored English; no representative local customers |
| Project-authored demo feedback | MIT; 24 fictional comments | Demonstration | Not a survey, real reviews or impact evidence |
| Project-authored development suite | MIT; 42 cases: 30 tourism, 12 unknown | Feedback comparison | Used during development, not independent field accuracy |
| Project-authored FAQ | MIT; 18 references, 11 development tests | Bounded factual matching | Narrow query forms, not comprehensive safety/availability coverage |
| MASSIVE 1.1, Amazon/FitzGerald et al. (2022) | CC-BY-4.0; 16,521 utterances/locale; en-US, sw-KE, fr-FR, es-ES = 66,084 available rows; each direction uses 1,024 train/64 dev/128 test pairs | Translation adaptation/evaluation | Generic assistant intents, not farm messages; locale-aligned IDs can include culturally localized entity substitutions rather than literal translations |
| FLORES-200, Meta | CC-BY-SA-4.0; 1,012 devtest sentences/language available; first 64 aligned sentences/direction scored; first 8 separately checked after export | Evaluation only; no gradients or selection | Small general-domain subset, not native-reviewed tourism reliability or leaderboard result |
| Wikivoyage Coffee revision 5376106, contributors | CC-BY-SA-4.0; 17,360-byte snapshot; informed 12 authored robustness prompts | Tourism reference/testing | Not approved farm facts or a parallel corpus; prompts lack native reference translations |
| OpenStreetMap contributors / Overpass | ODbL-1.0; three guesthouse features, 880-byte Nyeri-area snapshot | Discovery baseline | Bounded/incomplete reference area; not Ondera coordinates or a live map integration |
| WDI/ITU/UN Tourism | CC-BY-4.0 subject to indicator metadata; three Kenya series requested 2000–2025 | Context only | Country aggregates; missing recent tourism values in these snapshots; not training |
| Project-authored Swahili copy | MIT; bilingual dictionary/action/fact drafts | Named local-language interaction | Native-speaker review pending; some technical terms remain English |
| Optional operational feedback | User/operator permission; up to 1,000 local comments, 5,000 characters each | Local inference/workflow | Not bundled or silently trained on; shared-device/redaction risks |

Application MIT does not replace model/data licenses. Preserve [license texts](LICENSES/), notices, dataset attribution and article contributor history. Pretrained MiniLM/OPUS corpora are documented in model cards; the project does not claim ownership. Suggested sources are optional: Yelp was not imported because its academic-use terms/local relevance need review; Enterprise Surveys may underrepresent an informal microbusiness; speech resources are outside this text release. Health/agriculture are alternative tracks, not additional obligations.

### Translation adaptation and measured evidence

Six supplied training records preserve pinned checkpoints, train/dev/test IDs, losses, outputs and selection. Per direction: seed 31, aligned locale IDs within the same official partition, examples ≤220 characters, last two decoder layers trained for 256 optimizer steps, batch four, AdamW LR 0.00005, gradient clipping 1.0; remaining layers frozen. Six directions represent 6,144 pair presentations with shared IDs, not 6,144 independent tourism conversations.

| Direction | Dev chrF base | Dev adapted | MASSIVE test chrF (128) | FLORES chrF (64) |
| --- | ---: | ---: | ---: | ---: |
| en→sw | 45.02 | 48.89 | 55.01 | 57.18 |
| sw→en | 35.38 | 39.95 | 43.40 | 45.03 |
| en→fr | 63.51 | 69.13 | 70.54 | 70.41 |
| fr→en | 60.27 | 68.29 | 70.94 | 67.74 |
| en→es | 61.15 | 62.24 | 69.43 | 55.19 |
| es→en | 57.98 | 65.15 | 67.22 | 56.90 |

**chrF is character overlap, not percent of correctly translated messages.** These floating-point PyTorch results are inherited from supplied training records, not retrained/rescored during this deadline patch. Browser/q8 outputs may differ. [Exported-model outputs](docs/training/quantized-results.json) preserve failures. This patch verifies packaged hashes and supplied train/dev/test ID separation.

Known failures: 10:00 → French “22 h,” disappearing Spanish currency character and missing Swahili→English price. The sw→en base is **Congo Swahili (`swc`)**, while adaptation uses Kenyan Swahili (`sw-KE`). Adaptation does not prove dialect equivalence. MASSIVE cultural substitutions can distort literal names/places. Back translation is another machine draft, not independent assurance.

## Verification, strengths and weaknesses

| Evidence | Result | Limit |
| --- | --- | --- |
| Feedback evaluation reproduced in this patch | Semantic 37/42; keyword 17/42; compact 16/42; semantic accepts 25/42; 12/12 unknown cases deferred | Authored development suite; errors include missed themes/abstentions; no field-accuracy claim |
| FAQ development reproduced | 11/11 | Narrow authored queries |
| Workflow checks | 15 pass | Synthetic, not operator usability |
| Actual handler + SQLite/D1 adapter | 21 pass | Capacity race, revisions, access, consent and clarification privacy; no live provider delivery |
| Translation/cache/archive checks | 16 pass | Real ZIPs and network-disabled import in Node VM; no physical-phone/native-language guarantee |
| Desktop origin/path checks | 3 pass | Not actual Windows/Mac launch or OS trust validation |
| TypeScript, lint, production build | Pass | Compile/static checks are not UI/field evaluation |
| Offline integrity/network simulation | Pass | Actual bytes, simulated CacheStorage/network; target-phone cold reopen pending |

**Strengths:** inspectable end-to-end workflow, local inference, exact evidence, abstention/correction, human approval, optional sideloading, separate consent, protected bookings and reproducible provenance.

**Weaknesses:** synthetic English feedback, fallback coverage, translation/dialect/entity errors, large optional packs, unencrypted shared-device records, no independent field impact, unmeasured phone performance and limited current UI/native validation. Tone is heuristic; the service is single-operator and helper permissions are not a multi-role system.

**Time limits:** this hackathon patch prioritizes functional controls and honest submission evidence. It does not include retraining, a representative field study, native-language review, physical-device benchmarks, new signed installers or live SMS setup. Existing supplied installers are 3.0.0; source/web patch is 3.0.2. Older installers are not newly rebuilt artifacts.

## Responsible AI and localization

People decide. Suggestions never silently publish facts, approve bookings, send campaigns or train on messages. Unsupported/ambiguous content goes to a person. FAQ replies read approved facts; evidence quotes come from sanitized input. The tool supports decisions without guaranteeing accuracy or business outcomes.

Analysis, testimonial and marketing consent are separate. Server owner identity and private visitor keys protect records; keys are not public URL parameters. Server request deletion removes linked feedback. Device deletion does not remove server records, backups or historic observations. Redaction can miss names and other identifiers or remove unrelated long numbers. Browser storage/backups are unencrypted; shared unlocked phones expose them. Use minimum necessary records, manual privacy review, practical access controls and explicit backup/deletion habits.

English pretrained feedback may miss local expression, sarcasm, mixed language, spelling variants, indirect concerns and accessibility needs. Do not rank customers or infer protected traits. Evaluate errors/abstentions by language/context using consented unseen data. Swahili is the named reference language, not a claim about Noor's actual home language.

For a less-supported language, begin with community-authored labels and reviewed fixed phrases, preserve originals, offer human translation and abstain from unsupported inference. With local partners, collect consented/licensed representative bilingual tourism text, create an untouched test set, then adapt/distill only after measuring quality and device costs. A language label does not add model understanding. Voice requires separate data, licenses and evaluation.

Localizing AI means fitting language, borrowed devices, time, institutions and user authority. Community members must help define useful actions and acceptable errors; trusted guides/cooperatives and installation helpers matter as much as the model.

## Challenge requirement matrix

Reference: supplied **World Bank Challenge PDF**, Sections 1–9, especially 5–9 and Annex C (printed pages 19–20). This covers explicit requirements and judging/precondition expectations; it is an evidence/status map, not a guarantee of complete field compliance.

| Requirement | Product / report / video evidence | Status / remaining task |
| --- | --- | --- |
| One sector, working prototype, sector proof (§5/Annex C) | Track C; new comment → evidence → approved improvement; editable code | Implemented; record actual flow |
| Existing device (§6) | Responsive PWA for borrowed smartphone; computer companion | Target-phone validation pending; basic phone cannot run AI |
| Offline core (§6) | New feedback, local analysis, saved plans/backups, verified caches | Automated checks pass; film real cold reopen/new input if possible; disclose desktop/simulation scope otherwise |
| Small models/sideload/weak networks (§6) | 73.5 KB fallback, 23 MB MiniLM, optional verified archives, honest sizes | Translation size and low-end-phone fit remain limitations |
| Named local interaction; less-supported language (§6) | Kiswahili controls/actions; reviewed drafts; community-led adaptation path | Implemented text; native review pending; scripts discuss it |
| Human final call/uncertainty/no hallucinations (§6/§9) | Exact evidence, corrections, Ask a person, explicit approval, approved facts | Controls implemented; imperfect coverage disclosed |
| Problem data source/year/country (§7.2) | Kenya WDI/ITU 2024 internet; WDI/UN Tourism 2019 tourism | Cited snapshots; household/impact inference excluded |
| Every dataset's source/license/size/gaps; synthetic labeling (§7.2) | Inventory, model cards, source manifest, training reports | Documented; upstream data remains separately attributed |
| Common + sector grounding (§7.1–7.4) | OPUS/MASSIVE/FLORES language, WDI connectivity/tourism, Wikivoyage/OSM | Relevant sources used; entire suggested list is not mandatory |
| Prototype with code or link (§8.1) | Source ZIP, prebuilt offline demo, GitHub guide | Upload extracted source and verify access; private preview alone is insufficient for anonymous judges |
| Mandatory 2–5-minute video (§8.2) | Existing one-minute intro + two one-minute scripts ≈ three minutes | **Record/upload; scripts are not a submitted video** |
| One-sentence user/action/time/counterfactual/evidence (§8) | Outcome sentence above and demo narration | Record; qualify prototype evidence vs field impact |
| AI capability/simpler-tool comparison/guardrails (§8) | Semantic grouping, keyword baseline, uncertainty and approval | Technical narration and report |
| End-to-end clear journey (§8) | New feedback → original evidence → edited approved plan | Record actions, not only dashboard |
| Place in user's day and stack (§8) | Weekend routine; React/TypeScript, ONNX WASM, local storage, Worker/D1 | Scripts and report |
| Reflection on localization (§8) | Language, device, authority, community; weaker-language path | Technical closing |
| Fidelity 25%, relevance/impact 20%, data 15%, evidence 15%, clarity/inclusivity/AI value 15%, scale 10% (§9) | Workflow, baseline, data gaps, evidence, constraints and roadmap | Addressed; no claimed judging score/win |
| Responsible AI pass/fail (§9) | Privacy/consent/bias, human correction, uncertainty, risk disclosure | Controls present; native/field review still needed |
| Tourism preconditions/non-AI listing value (Annex C) | Listing and digital literacy acknowledged; analytical benefit kept distinct | Real facts, local installation support required |
| Eligibility/logistics (§4/§8) | Brief specifies entrants 18–35 and prior application form; one sector | Team must verify eligibility/registration/organizer rules; package does not apply or submit |

## Run, develop and reproduce

Stack: React 19.2.6/TypeScript 5.9.3, Next-style APIs via Vinext 1.0.0-beta.5/Vite 8.0.13; Transformers.js 3.8.1/ONNX Runtime WASM; service worker/CacheStorage/local storage; optional Worker/D1/Drizzle service; Electron desktop. Comments/translations do not use remote inference.

### Immediate local demo: no build

Extract the complete ZIP and open a terminal in `FarmPilot/`. Do not use `file://`.

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory public
```

Windows alternative: `py -m http.server 8080 --bind 127.0.0.1 --directory public` if Python's launcher is installed. Open **http://localhost:8080/offline/index.html**. Files are local; internet is unnecessary. `/offline` records are a local demonstration, not the connected booking service. In **My device**, prepare the full package and wait for readiness before offline semantic analysis. The core uses compact fallback.

The complete ZIP includes translation chunks. Install directions from local files or generate browser-importable ZIPs:

```sh
python3 scripts/package-language-archives.py
```

Output: `language-packs/FarmPilot_Models_{Swahili,French,Spanish}.zip`, each with both directions/shared runtime. Hosted app: **Load a language file**. Generated ZIPs duplicate chunks, so do not commit them. The smaller GitHub ZIP keeps the full feedback demo; optional translation binaries are in the complete package/language ZIPs. Merge `public/translation/chunks/` from the complete package before rebuilding archives.

### Build and checks

Use **Node 24 LTS** for the full suite (`node:sqlite`, file-Blob support); web build minimum is Node 22.13. pnpm is pinned in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm build:offline
pnpm test:workflow
pnpm test:service
pnpm test:ai
pnpm models:archives
pnpm test:translation
pnpm test:offline
pnpm test:desktop
pnpm exec tsc --noEmit
pnpm lint
pnpm build
pnpm dev
```

`pnpm build` now refreshes the offline UI before the website, preventing drift. Hosted preparation excludes translation chunks and marks archive distribution; local/desktop source retains them. [Training scripts](scripts/ml/) and [cards](docs/translation-data-card.md) record adaptation/export. Raw MASSIVE/FLORES archives are reproducibly fetched, not duplicated in Git; normal builds do not retrain.

The service needs generated migrations and D1 binding `DB`. Set `NOOR_OWNER_ID` to the trusted platform-forwarded stable operator ID. Missing owner configuration denies operator actions. `NOOR_PRIVATE_OWNER_ONLY=1` is exclusively for a platform-enforced owner-private preview; remove it and set the owner ID before sharing/public deployment. `.openai/hosting.json` is platform-specific, not a reusable identity for a new deployment.

Live SMS is optional/unconfigured. Twilio credentials, operator phone, public origin and a reachable signed webhook are required; private preview access blocks external providers. **No live SMS was sent.** No provider delivery, campaigns, payment or marketplace synchronization is claimed. Never commit secrets, `.env`, operational records, caches, `node_modules` or `.git`.

## What can improve after the deadline

1. Record/upload the mandatory video; verify judges can access the code/demo.
2. Cold-reopen the intended phone offline, analyze **new** feedback and approve a **new** plan. Measure setup/storage, latency, peak RAM and battery; evaluate optional translation separately.
3. Native Swahili/tourism review of controls, dialects, names, negation, amounts, accessibility and reply safety; keep reviewed phrases when models fail.
4. Consented unseen reviews/bilingual tourism pairs and an independent locked test set. Measure misses, abstentions, corrections, useful-action selection time and repeat visits; revenue/jobs need longer observation and credible comparison.
5. Domain adaptation, calibrated abstention and entity-constrained translation; investigate distillation/pruning/smaller packs only after quality/device measurements.
6. Pilot with guides/cooperatives using approved real facts, retention/deletion rules, install/backup support and measured time saved.
7. Multi-business authorization, encrypted records, accessible/voice interfaces and real provider integrations when demonstrated needs justify them. Reuse modules while reassessing each setting's constraints.

## Primary references

- Supplied World Bank Small AI for Development challenge PDF, Sections 4–9 and Annex C; not redistributed in this repository.
- [MASSIVE project/paper](https://github.com/alexa/massive), [dataset card](https://huggingface.co/datasets/AmazonScience/massive), [official 1.1 archive](https://amazon-massive-nlu-dataset.s3.amazonaws.com/amazon-massive-dataset-1.1.tar.gz).
- [FLORES-200](https://github.com/facebookresearch/flores/tree/main/flores200), [license](https://github.com/facebookresearch/flores/blob/main/LICENSE_CC-BY-SA).
- [MiniLM card](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2), [ONNX distribution](https://huggingface.co/Xenova/all-MiniLM-L6-v2).
- [OPUS-MT](https://github.com/Helsinki-NLP/Opus-MT); six exact checkpoint revisions/links in [translation card](docs/translation-data-card.md) and [manifest](public/translation/manifest.json).
- WDI Kenya APIs: [internet](https://api.worldbank.org/v2/country/KEN/indicator/IT.NET.USER.ZS?date=2000:2025&format=json&per_page=100), [arrivals](https://api.worldbank.org/v2/country/KEN/indicator/ST.INT.ARVL?date=2000:2025&format=json&per_page=100), [receipts](https://api.worldbank.org/v2/country/KEN/indicator/ST.INT.RCPT.CD?date=2000:2025&format=json&per_page=100), [tourism metadata](https://databank.worldbank.org/metadataglossary/world-development-indicators/series/ST.INT.ARVL).
- [Wikivoyage pinned Coffee revision](https://en.wikivoyage.org/w/index.php?title=Coffee&oldid=5376106), [contributors](https://en.wikivoyage.org/w/index.php?title=Coffee&action=history), [copyleft](https://en.wikivoyage.org/wiki/Wikivoyage:Copyleft).
- [OpenStreetMap attribution/terms](https://www.openstreetmap.org/copyright); bounded query, licenses and hashes in [source manifest](docs/training/source-manifest.json).

The strongest current claim is a working, inspectable local prototype with explicit limits. Recording, submission and field impact remain separate tasks.
