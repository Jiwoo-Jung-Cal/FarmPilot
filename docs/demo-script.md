# Mandatory submission video: 3–4 minutes

The challenge requires a 2–5 minute video. This document is a recording script,
not a completed video. Record a real screen demo; use a human narrator. Show
actual results and label synthetic comments clearly. Do not claim native Swahili
validation, independent model accuracy or revenue gains.

## 0:00–0:25 — problem, counterfactual and evidence

Say: “Without an affordable offline way to review scattered guest comments,
Noor may miss repeated requests and spend her limited improvement budget on the
wrong things; Fieldnotes helps her choose one change from the guests' own words.”

Show: the supplied brief's fictional Noor scenario, then the World Bank Kenya
internet-use context (about 35%, 2024; WDI/ITU). Explain that this is evidence
for constrained access and that the business-impact counterfactual is a design
hypothesis, not a measured loss. State that Ondera and all demo comments are fictional.

## 0:25–0:50 — place in the user's day and device

Say: “After tours, comments arrive in conversations and messages. When Noor
borrows her daughter's smartphone on the weekend, she can enter them together,
review recurring issues, and leave with a plan for the next week.”

Show: Visitor feedback → Add feedback. Paste two different fictional comments, separated by a blank
line, choose batch entry, confirm permission, and save. Explain that a basic
call-only phone cannot run this app; the existing household smartphone is the target.

## 0:50–1:25 — what is AI, and why rules are insufficient

Show: My device → Install / check offline files → Visitor feedback.
Say: “A small quantized sentence model groups paraphrased guest sentences into
six tourism themes locally. Keyword rules miss alternate wording. On our 42
synthetic development examples, semantic theme accuracy is 37/42 versus 17/42
for a simple keyword baseline. These examples were used during development;
we still need independent visitor evaluation. Tone is a transparent word-cue
heuristic, not a validated sentiment model.”

Pick a test case from evaluation.json where semantic is right and baseline wrong;
show its actual wording and prediction, not a fabricated before/after claim.

## 1:25–2:05 — end-to-end decision and guardrails

Show: a suggested improvement → exact original quotes, source/date → operator
note → Plan this improvement → My improvements → Start experiment → Record outcome.
Say: “Every theme has original evidence. The suggested activity is a fixed
starting point; Noor edits her plan and explicitly approves it. A booking also requires an operator-approved quote and explicit visitor acceptance. Later she records what she observed; changes in
comments don't prove this experiment caused more income.”

Use a draft note such as “Try the arrival card for the next two tours; ask guests
whether it helped them find the entrance.” Mark any entered outcome “demo observation”.

## 2:05–2:35 — uncertainty, privacy and localization

Show: a short comment such as “Okay.” deferred to review, correction controls,
then a Swahili-language comment with the feedback language set to Kiswahili
preserved for human review. Switch operator controls to Kiswahili and show the
translated improvement card. Explain that English visitor evidence stays visible.

Say: “The app asks permission, removes phone numbers and emails, and keeps
comments on the device. Names still need manual removal. Shared unlocked phones
are a risk, and the notebook is not encrypted. Swahili controls and action text
work locally, but a native speaker must validate the draft. We do not claim
automatic Swahili understanding or translation.”

## 2:35–3:20 — offline proof and technical stack

Before recording, on the intended smartphone: prepare the full package, wait
for Ready, open the installed app, enable airplane mode, close and reopen it,
then enter a NEW comment, analyze it and approve a NEW plan. Film that sequence.
Show the connection indicator and successful action, not just a cached overview.

Say: “The core workspace and compact model are about 1.4 megabytes. An optional
full package of about 48 megabytes includes MiniLM weights and the WASM runtime.
After setup, new feedback inference and decision-making happen locally. React,
Vite, Transformers.js and local browser storage provide the workflow. Package
integrity is checked before switching an installed version.”

If the real-phone test cannot be completed, state that limitation explicitly
and show the code-level offline checks. Do not present the simulated check as
phone or airplane-mode validation. That gap materially weakens the submission.

## 3:20–3:45 — reflection and next test

Say: “Our first version prioritizes Noor's one weekly decision. The next test is
with a native Swahili reviewer and a tourism operator using consented actual
comments. We will measure missed requests, correction rates, time to choose a
useful action, and memory/battery use on the borrowed phone. Our strongest
claim today is a working, inspectable, local prototype.”

Optionally show the visitor page, a request, operator quote approval and visitor
acceptance. Keep this supporting flow short so the offline evidence-to-improvement
workflow remains the center of the video. Live SMS and campaigns are not configured.

End with the code/download location and an accessible demo URL if sharing is enabled.

## Recording checklist

- Duration 2–5 minutes, voice legible and controls readable.
- Show one complete flow from new feedback to a human-approved improvement.
- Include problem/counterfactual/evidence, AI justification, guardrails, daily
  use, stack when relevant, and localization reflection.
- Label every synthetic example and mock outcome.
- Record real target-device offline behavior when possible.
- Upload the video through the hackathon's submission process; the script alone
  does not satisfy the mandatory video requirement.
