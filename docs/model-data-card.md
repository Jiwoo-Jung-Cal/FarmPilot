# Model and data card

## Intended use

Assist a tourism operator reviewing consented guest feedback about a coffee-farm
visit. Outputs are six theme labels, explicit-cue tone flags and original
sentence evidence. The operator chooses and edits a fixed improvement template.
Not intended for medical advice, credit, employment, customer profiling or
unattended business decisions. Ratings never establish a guest's sentiment.

## Compact model

- TF-IDF (unigrams/bigrams, sublinear term frequency, L2 normalization) plus
  class-balanced logistic regression, exported for browser inference.
- 789 features; six themes plus `other`; 73,516 bytes, 71.8 KiB.
- 72 authored synthetic training sentences: 48 tourism examples and 24 other
  examples. Source: `data/training.json`, generated from domain examples plus
  explicit out-of-scope training sentences. MIT license.
- No guest/user data is used for training. Unknown-word coverage, minimum
  probability 0.40 and margin 0.07 gate accepted classifications. Values are
  development choices, not calibrated guarantees.
- Very low accepted coverage on the development suite. Designed as a conservative
  fallback plus human review, not a replacement for the fuller engine.

## Semantic model

- [all-MiniLM-L6-v2 model card](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2).
- [Xenova ONNX files](https://huggingface.co/Xenova/all-MiniLM-L6-v2/tree/main/onnx).
- English sentence-transformer, 384-dimensional normalized embeddings, Apache 2.0.
- Included q8 ONNX weights: 22,972,370 bytes. SHA-256:
  `afdb6f1a0e45b715d0bb9b11772f032c399babd23bfc31fed1c170afc848bdb1`.
- Tokenizer/configs included locally; no remote-model fallback. Transformers.js
  3.8.1 and ONNX Runtime Web run single-threaded WASM in the browser.
- The underlying pretrained corpus is broad English text, not Ondera data or a
  locally validated tourism dataset. The original model card documents training.
- Classification compares embeddings with 48 fixed scenario prototypes across
  six themes. Similarity threshold 0.37, inter-theme margin 0.045, word coverage
  and short/out-of-scope checks cause abstention. Scores are not probabilities.
- Complete client/runtime/model payload ~48 MB, much larger than the model alone.
  No RAM/battery/low-end phone performance claim has been measured.

## Additional 2.0 use: bounded FAQ retrieval

The same MiniLM encoder compares an English question to 18 authored FAQ
reference sentences across six categories. A match requires cosine similarity
at least 0.52 and a 0.045 margin. The answer is conventional code reading
operator-approved business facts; there is no generated fact or translation.
Known availability, safety, food, discount and unusual-arrangement questions
are escalated. Swahili uses fixed authored phrase patterns, not the English
embedding model. These patterns require native review.

The 11 authored FAQ development cases in `docs/faq-validation.json` passed,
including five escalations and two Swahili phrase matches. This small suite
is not independent evidence of reliability. Neither feedback, visitor requests
nor business records fine-tune MiniLM.

## Data inventory

| Data | Size / count | Source / license | Role and gaps |
| --- | --- | --- | --- |
| Prototype/training sentences | 48 tourism + 24 other | Authored for this project, MIT | Synthetic; narrow English vocabulary |
| Demonstration feedback | 24 comments | Authored from challenge scenario, MIT | Fictional; no survey, identities or measured outcomes |
| Development test suite | 42 cases: 30 tourism, 12 unknown | Authored for this project, MIT | Separate sentences but used during development; no independent test claim |
| Swahili operator copy | Two-language dictionary + action cards | Draft authored for project, MIT | Not native-speaker validated; mixed technical English on device page |
| Connectivity context | 2023 and 2024 Kenya internet-use observations | World Bank WDI / ITU; see original source's reuse terms | Context only, not training or evidence of this product's business impact |
| Optional user feedback | Maximum 1,000 comments per device; max 5,000 characters each | Operator permission required; not distributed or trained on | Language self-reported; English analysis only; names require manual removal |

World Bank API snapshot: `data/kenya-connectivity.json`, retrieved 2026-10-03,
source updated 2026-07-13. Indicator IT.NET.USER.ZS, Kenya, 2024 = 34.97622513%
(about 35%) and 2023 = 32.07040024%. These are population internet-use percentages,
not smartphone ownership, network availability or Noor-specific measurements.
[Original API](https://api.worldbank.org/v2/country/KEN/indicator/IT.NET.USER.ZS?format=json&date=2023:2024)
and [indicator context](https://data.worldbank.org/indicator/IT.NET.USER.ZS?locations=KE).
The local-language/household-phone choice is a design response to the brief and
connectivity context, not a validated inference about every Kenyan operator.

## Operational data added in 2.0

The demonstration business, three activities, KES prices, farm illustration
and initial enquiry are fictional authored examples. The visitor forms collect
names/contact preferences, visit choices and an explicitly consented request;
connected records are stored in D1. Capability keys are private and are never
embedded in public URLs. The online feedback endpoint requires a completed
visit and its key. Owner-approved testimonials expose only the sanitized text,
date, language and demonstration flag, without the linked request identifier.

Analysis permission, testimonial permission and newsletter opt-in are separate.
The operator imports consented form feedback into the on-device notebook for
local inference. Connected form feedback remains on the service until explicitly
deleted; device deletion does not remove it. Backups and historic improvement
notes are separate records. Local data and export files are unencrypted.
No visitor feedback or operator records are used to train either model.

The hero image is an original AI-created illustration, explicitly labeled as
such. It is not evidence of a real farm, facility or experience.

## Evaluation and limitations

Full predictions are in `docs/evaluation.json`. Exact semantic accuracy is
37/42 (88.1%), keyword baseline 17/42 (40.5%), compact 16/42 (38.1%). The semantic
model accepts 25/42 cases; all five errors are abstentions. Unknown recall is
12/12 for both AI engines. These small synthetic development results do not
establish field performance, safety or utility. Confidence intervals would not
repair sampling and development-selection bias. Tone has no accuracy study.

Potential failures: sarcasm, negation, overlapping themes, mixed languages,
translation errors, unusual place names, phonetic spelling and indirect requests.
Out-of-scope keyword gates can reject legitimate tourism comments. Redaction can
remove long numbers unrelated to phones and miss identifiers. Exact quotes are
from sanitized text; operators should keep consented originals elsewhere only
if lawful and necessary. Browser storage is not encrypted and a shared unlocked
phone exposes the notebook. Deleted comments cease contributing to current
counts; historic plan baselines remain as recorded, so they are not causal claims.

## Licenses and notices

Original app code, compact weights and authored synthetic data: `LICENSE` (MIT).
MiniLM and Transformers.js: Apache 2.0, full text in `LICENSES/Apache-2.0.txt`.
ONNX Runtime: MIT; copyright Microsoft Corporation; full upstream notice in
`LICENSES/ONNX-Runtime-MIT.txt`. React and other bundled dependencies retain
their upstream licenses; see `LICENSES/third-party-notices.txt`. This project
claims no ownership of pretrained model training corpora or World Bank content.

## FarmPilot 3.0 translation update

See [the translation model and dataset card](translation-data-card.md) and `training/` for actual four-language adaptation, optional pack sizes, dataset licenses and validation limits. The compact/semantic feedback engines above are unchanged.
