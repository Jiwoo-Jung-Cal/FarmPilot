# Publish FarmPilot

## Upload the repaired repository

Use GitHub Desktop signed into **Jiwoo-Jung-Cal**, or an account with write access to `Jiwoo-Jung-Cal/FarmPilot`.

1. Clone `https://github.com/Jiwoo-Jung-Cal/FarmPilot`.
2. Extract the prepared `FarmPilot-v3.0.3-Source.zip`. Copy everything inside its `FarmPilot` folder into the clone, including `.github`, `.gitignore` and `.npmrc`. Keep the clone's own `.git` folder.
3. In GitHub Desktop, commit with `Restore public assets and publish FarmPilot 3.0.3`, then click **Push origin**.

The base `public/` folder is about 48 MB and includes the English model and browser runtime. Use Git rather than the browser upload form. Optional translation weights are release assets and are ignored in Git.

## Publish the version

After pushing the repaired files, create and push the tag from a terminal in the clone:

```sh
git tag v3.0.3
git push origin v3.0.3
```

The **Publish versioned web release** GitHub Action creates the release and attaches the static demo ZIP, report, scripts and checksums. GitHub adds source ZIP/tar downloads automatically. If necessary, rerun the workflow from **Actions**, selecting tag `v3.0.3`.

Open **Releases → v3.0.3 → Edit** and attach the existing `FarmPilot_Models_Swahili.zip`, `FarmPilot_Models_French.zip` and `FarmPilot_Models_Spanish.zip` files. These archives contain the six optional translation directions. They are not native installers.

## Vercel

The root `vercel.json` specifies a static build from `public/` using `node scripts/build-static.mjs`, with output directory `static`. Root directory is the repository root and framework is **Other**. Repository configuration takes precedence over the temporary dashboard commands that fetched assets from the old demo host.

After the push, verify the new deployment is Ready and test `/offline/index.html`, core offline installation and full model installation. The existing public demo remains at https://farm-pilot-five.vercel.app/offline/index.html until the next successful deployment.

## Windows and macOS

After attaching all three language ZIPs to the release, run **Actions → Build desktop installers → Run workflow**, using tag `v3.0.3`. It downloads and verifies the model packs, builds Windows/macOS installers and attaches successful `.exe`/`.dmg` builds to that same release. The base tagged source alone does not contain the translation weights. Native builds have not yet run for this release; signing and native device verification remain outstanding.

Do not recreate historical versions by tagging this same source under older version numbers. Historical releases need their original source snapshots.
