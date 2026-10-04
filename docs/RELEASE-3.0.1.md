# FarmPilot 3.0.1 website update

The hosted website side-loads verified FarmPilot language ZIPs rather than shipping every optional translation model in its deployment archive. Each ZIP includes two translation directions and the shared runtime. Installation reads bounded entries in a worker, verifies SHA-256 against the pinned catalog, and marks only complete packs ready. It does not extract arbitrary archive paths or upload messages. Network-free installation of all three real language archives is tested.

The core offline package includes the small translation library so the worker can start without a network connection; the large runtime is installed from the model ZIP. `build` prepares the hosted distribution and corrects its offline-manifest hashes. Run `build:offline` before `build` when rebuilding the prebuilt interface.

Model weights, training, evaluations, message review and existing booking behavior are unchanged. Desktop 3.0 development installers remain valid and include every model; their bundled interface predates the optional ZIP import control. Native launch, phone memory/performance, native-language review and real SMS delivery remain pending.
