# Upload FarmPilot with folders intact

`README.md` is the report GitHub renders automatically. Use this standard filename, rather than a literal `.readme` extension.

## Fast route: GitHub Desktop

1. Extract `FarmPilot_GitHub.zip`. Open the folder named `FarmPilot`.
2. GitHub Desktop: **File → Add local repository**. If it is not a repository, choose **Create a repository here**. Use the existing `FarmPilot` folder, not a new empty folder beside it.
3. Review files, commit and **Publish repository**. Choose the visibility/access judges require; do not publish private visitor data or credentials.
4. Check `app/`, `lib/`, `public/`, `docs/`, `scripts/`, `drizzle/`, `desktop/` and `README.md` appear in GitHub. Invite Kelvin through repository settings if you want collaboration; the package does not send invitations.

The smaller ZIP contains source, prebuilt offline feedback client, MiniLM/runtime, training evidence, scripts and report. Optional translation binary chunks are distributed in `FarmPilot_Complete.zip` and per-language ZIPs. The complete ZIP has all six directions; merge its `public/translation/chunks/` into the same project for full local/desktop translation. It is much larger; do not let that download delay the mandatory video/source submission.

## Git command-line route

In the extracted project:

```sh
git init
git add .
git commit -m "FarmPilot hackathon prototype and World Bank report"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace the placeholder with your own repository's URL. Use a new/empty repository or reconcile existing work; do not force-push over teammates' changes. No credentials are included.

## Browser upload

GitHub's upload page can accept dragged folders with supported browsers. **Drag the contents of the extracted FarmPilot folder**, including its subfolders, into **Add file → Upload files**; a file-picker selection may omit directories. Check the file tree before committing. Large complete-model uploads are better handled through GitHub Desktop/Git, or stored as Release assets with manifests. Every model chunk is below GitHub's single-file limit, but the entire multilingual set makes the repository large.

If using the browser under a deadline, upload the small source package and its folders first. Do not upload only the ZIP and call that an editable repository. The ZIP can additionally be attached to a Release for downloads.

## Keep and exclude

Keep source, data cards/training evidence, licenses, lockfiles, prebuilt `public/offline`, model manifests, report and scripts. Exclude dependencies, caches, `.git`, `.env`, operational visitor records and provider credentials. Generated language ZIPs duplicate source chunks and are ignored.

`.openai/hosting.json` identifies this workspace preview. Preserve it for this Site only; configure a new deployment according to its platform instead of reusing the ID. Before a public/shared deployment, set the real operator identity and disable the private-preview fallback described in README.
