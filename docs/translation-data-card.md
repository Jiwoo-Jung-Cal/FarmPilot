# FarmPilot 3.0 — translation model and dataset card

Release date: 4 October 2026. Prototype, not a certified translation service.

## What changed

FarmPilot is the producer workspace. Its exact slogan is “You grow the coffee. We help brew the ideas.” It appears in the producer sidebar only. `/visit` uses the business name, visitor title and a separate visitor manifest. The existing private Site address and storage identifiers are preserved for continuity. Noor remains the operator persona.

Incoming visitor messages can specify English, Kenyan Swahili, French or Spanish. Noor chooses a reading language, translates the original, writes in her own language, translates her reply into the visitor’s language, edits it, optionally requests a back translation, checks the review box and applies the reply. Applying a reply does not send or approve a booking: the existing operator action saves it, and a visitor accepts a quote separately. The original received message stays visible. Reviewed outgoing translations retain the original draft, language pair, model labels and review timestamp in operator records and backups; the hosted visitor status endpoint excludes that private translation metadata.

## Model design and actual training

Six Marian encoder–decoder translation models, based on pinned Apache-2.0 OPUS-MT checkpoints from Helsinki-NLP, run locally through Transformers.js 3.8.1 / ONNX Runtime. These are specialized neural translation transformers, not a general chat LLM trained from scratch. No 100-language support is claimed. Non-English pairs use English as a pivot, which can compound errors. One model is held in memory at a time.

For EACH direction, 1,024 aligned real MASSIVE 1.1 **train** pairs were selected deterministically (seed 31). Utterance IDs join the same partition across source and target locales; examples longer than 220 characters are excluded. The last two decoder layers were fine-tuned for 256 optimizer steps, batch size 4, AdamW learning rate 0.00005, gradient clipping 1.0. Encoder, embeddings and other decoder layers stayed frozen. No guest messages or phone numbers were used for training.

A separate 64-pair official **dev** subset selects between the adapted and base checkpoint. All six adapted checkpoints improved on this subset and were selected. A separate 128-pair official **test** subset was evaluated only after selection. The initial short experiment was discarded; the release reports use the partition-separated run. Across six directions there are 6,144 pair presentations, with substantial shared utterance IDs; these are not 6,144 independent tourism conversations. MASSIVE is a generic assistant-intent corpus, not a farm-booking corpus.

| Direction | Dev chrF before | Dev chrF after | Test chrF (128) | FLORES chrF (64) | Pack MiB |
|---|---:|---:|---:|---:|---:|
| en-sw | 45.02 | 48.89 | 55.01 | 57.18 | 132.4 |
| sw-en | 35.38 | 39.95 | 43.40 | 45.03 | 132.4 |
| en-fr | 63.51 | 69.13 | 70.54 | 70.41 | 133.1 |
| fr-en | 60.27 | 68.29 | 70.94 | 67.74 | 133.1 |
| en-es | 61.15 | 62.24 | 69.43 | 55.19 | 141.4 |
| es-en | 57.98 | 65.15 | 67.22 | 56.90 | 141.4 |

These are character-overlap chrF scores, **not percentages of messages correctly translated**. MASSIVE/FLORES scores above use floating-point PyTorch checkpoints, greedy decoding. FLORES uses only the first 64 aligned devtest sentences, not the complete 1,012-sentence split or an official leaderboard submission. It was not used for fine-tuning or checkpoint selection. Quantized Node-runtime outputs for the first 8 FLORES sentences per direction and 12 authored tourism prompts per English-output direction are separately preserved in `docs/training/quantized-results.json`. Those prompts have no native-speaker reference translations, so they demonstrate execution and failure cases, not field accuracy. Browser tokenizer conversion can differ from Python SentencePiece.

The Swahili→English base is **Congo Swahili (`swc`)**, while MASSIVE examples are Kenyan Swahili (`sw-KE`). Fine-tuning does not prove these variants are equivalent. A native Swahili review and tourism-domain evaluation remain required before real deployments. The interface’s existing reviewed Swahili labels are separate from generated translation.

## Size, offline behavior and device limits

The website core is approximately 2.4 MB, including the small library needed to start offline ZIP imports; the feedback AI package is approximately 48 MB. Desktop 3.0 has the earlier approximately 1.5 MB core. Translation weights remain optional per direction (table above), plus approximately 23 MB of shared runtime files. English↔Swahili needs both directions. All four languages together are about 0.85 GB before compression, an explicit tradeoff rather than a tiny complete bundle.

The hosted website imports provided language ZIPs containing both directions and the shared runtime. They can be copied from another device and installed with the network disabled after saving the core app. Bounded ZIP entries are verified with SHA-256; corrupt/incomplete packs never become ready. Verified chunks assemble locally; remote-model fallback and third-party message requests are disabled. Runtime files are shared between languages. Removing packs retains messages. Desktop 3.0 bundles every model and installs it locally; its interface predates the optional ZIP control.

RAM, speed, battery, low-end Android support, storage quotas and real airplane-mode operation have **not** been measured on Noor’s borrowed smartphone. Keep the small core available if optional translation cannot run. A calls/SMS-only handset cannot run these models; it needs a borrowed smartphone/computer for translation. Live online requests, SMS delivery and publication still need their configured network services. No live SMS was sent.

## Dataset use from the World Bank brief

The brief’s lists are suggested sources, not a requirement to train on every listed resource. Five directly relevant tourism families were applied: MASSIVE, FLORES, WDI, Wikivoyage and OpenStreetMap. UN Tourism is also cited as the upstream source in WDI tourism metadata; it is not treated as an independent second sample. OPUS contributes the underlying pretrained model families. Training, evaluation, reference and context are deliberately distinguished below.

| Source | Actual subset and role | License and attribution | Gaps / exclusions |
|---|---|---|---|
| MASSIVE 1.1, Amazon Science | 16,521 utterances per locale in en-US, sw-KE, fr-FR, es-ES (66,084 rows available); 11,514 train / 2,033 dev / 2,974 test per locale. 1,024 aligned train pairs per direction; 64 dev; 128 test. Real translation fine-tuning. | CC-BY-4.0; Amazon Science / FitzGerald et al. (2022), MASSIVE. Official download and SHA-256 in source manifest. | Generic voice-assistant utterances, not natural tourism SMS; shared IDs and constrained locales. Intent labels were not relabeled as farm booking labels. |
| FLORES-200, Meta | Original archive; 4 languages, 1,012 devtest sentences each; first 64 aligned sentences used only for broad-domain evaluation. | CC-BY-SA-4.0; FLORES authors / Meta. Selected benchmark text remains separately attributed. | Not farm-specific, full benchmark not run; no training or checkpoint selection on this subset. NLLB-200 weights were not added. |
| OPUS-MT / Helsinki-NLP | Six pinned pretrained checkpoints, then local adaptation; model cards and versions below. | Apache-2.0 for model artifacts; original model notices retained. | We did not separately ingest the full OPUS raw corpus or claim to audit every pretraining source. |
| World Bank WDI | Kenya, 2000–2025 query: internet use, international tourism arrivals and receipts. Offline research snapshots. | WDI indicator licenses/metadata: CC-BY-4.0; World Bank; UN Tourism upstream for tourism series. | National context only. Not a forecast, household ownership rate, farm revenue or visitor count. Latest non-null tourism observations in this response were 2019; internet use was 2024. |
| Wikivoyage Coffee | One article, revision 5376106, 2026-10-02; 17,360-byte API snapshot. Coffee/travel topics informed 12 authored robustness prompts. | CC-BY-SA-4.0; Wikivoyage Coffee contributors, linked article history; snapshot preserved unchanged; prompts separately labeled as adapted/authored. | Not farm facts or a parallel translation corpus. No article claims were inserted into Noor’s approved business answers. |
| OpenStreetMap / Overpass | Kenya reference area near Nyeri: bbox south -0.5, west 36.8, north -0.3, east 37.1; tourism=guest_house, max 50; 3 features, 880-byte snapshot. Discovery baseline for the submission discussion. | ODbL-1.0; © OpenStreetMap contributors. Query and snapshot available separately. | Ondera is fictional. The reference area is not Noor’s actual location. Sparse map coverage does not establish absence of businesses or justify publishing a false pin. |
| Enterprise Surveys | Not imported. | Survey-specific access/license would need checking. | Formal firm data may not represent Noor’s microbusiness; no fabricated firm constraints. |
| Yelp Open Dataset | Not imported. Existing synthetic feedback remains labeled synthetic. | Academic/research terms need assessment before redistribution or commercial use. | Licensing and local relevance made it unsuitable for blindly bundling into this product. |
| Common Voice, FLEURS, MMS, AI4Bharat speech resources | Not imported. | Each corpus/model has its own license. | This release is text translation; speech data would add downloads without supporting its current workflow. |
| GSMA / additional sector datasets | Not imported. Kenya WDI context already used. | Source-specific terms would need checking. | No agricultural/health model was added to dilute the tourism submission. |

## Direct sources and pinned revisions

- World Bank Challenge, Section 7 and Annex C (supplied PDF, pages 8–9 and 20).
- MASSIVE: https://github.com/alexa/massive ; https://huggingface.co/datasets/AmazonScience/massive ; official archive https://amazon-massive-nlu-dataset.s3.amazonaws.com/amazon-massive-dataset-1.1.tar.gz
- FLORES: https://github.com/facebookresearch/flores/tree/main/flores200 ; https://dl.fbaipublicfiles.com/nllb/flores200_dataset.tar.gz ; https://creativecommons.org/licenses/by-sa/4.0/
- WDI metadata: https://databank.worldbank.org/metadataglossary/world-development-indicators/series/ST.INT.ARVL ; snapshots use api.worldbank.org, full URLs in the source manifest.
- Wikivoyage revision: https://en.wikivoyage.org/w/index.php?title=Coffee&oldid=5376106 ; attribution history https://en.wikivoyage.org/w/index.php?title=Coffee&action=history ; license https://en.wikivoyage.org/wiki/Wikivoyage:Copyleft
- OSM: https://www.openstreetmap.org/copyright ; query `[out:json][timeout:15];nwr["tourism"="guest_house"](-0.5,36.8,-0.3,37.1);out center tags 50;`
- Model conversion: Hugging Face Transformers.js tag 3.8.1 `scripts/extra/marian.py`, Apache-2.0; https://huggingface.co/docs/transformers.js/v3.8.1/en/custom_usage

- en-sw: https://huggingface.co/Helsinki-NLP/opus-mt-en-sw/tree/28780399d37e1161afc94577a717d7fcfa54fecc
- sw-en: https://huggingface.co/Helsinki-NLP/opus-mt-swc-en/tree/fd30f0575e2037990cb26de0774c9d000908551b
- en-fr: https://huggingface.co/Helsinki-NLP/opus-mt-en-fr/tree/dd7f6540a7a48a7f4db59e5c0b9c42c8eea67f18
- fr-en: https://huggingface.co/Helsinki-NLP/opus-mt-fr-en/tree/c4aed37b318c763fd177aa449b44e3b783cc6c02
- en-es: https://huggingface.co/Helsinki-NLP/opus-mt-en-es/tree/5bc4493d463cf000c1f0b50f8d56886a392ed4ab
- es-en: https://huggingface.co/Helsinki-NLP/opus-mt-es-en/tree/c96e2c5399ebfae4fc43d9669556b9afa74bb69d

## Failure handling and remaining validation

Machine translation can omit or hallucinate content. Actual exported-model examples include `10:00` becoming French `22 h`, and an English price phrase losing a currency character in Spanish. Number/date/time token and currency-code mismatches flag reading translations and block applying outgoing drafts. The user edits the draft and explicitly confirms review. These checks do not prove semantic equivalence: negation, names, accessibility and units need human review too. Back translation is another machine draft, not an independent guarantee.

Automated checks cover partition separation and recorded IDs, six real exported-model inference runs, locale validation and backup restoration, translation tamper/size controls, model-file integrity and network-free reconstruction, owner/visitor separation, existing booking capacity and revision rules, offline cache updates and desktop path security. Native app execution and real phone tests are still pending. The mandatory 2–5 minute hackathon video, native-language/domain evaluation, consented field feedback, and real phone demonstration still need to be completed.

## Reproducibility and privacy

`docs/training/source-manifest.json` records exact source URLs, sizes, hashes, roles and licenses. Six `*-training.json` files preserve optimizer settings, training/dev/test IDs, losses, base and adapted development outputs, untouched test outputs and chosen checkpoint. `scripts/ml/` fetches, trains, exports, quantizes, packages and evaluates the same sources. Training artifacts are in the source package; the full raw MASSIVE archive is intentionally fetched by the script instead of duplicated in Git. Actual messages remain operational data and are never silently added to training.

MIT covers application code. Apache-2.0 covers the original model/runtime derivatives as indicated. CC-BY-4.0, CC-BY-SA-4.0 and ODbL-1.0 apply to the separately identified data and snapshots. Do not remove data/model attribution when sharing the repository.
