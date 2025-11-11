AI Usage
Summary
This project used Copilot to generate boilerplate code, examples, and documentation drafts. Copilot-assisted outputs were reviewed and edited by the repository maintainers before inclusion. No private or sensitive user data was used as input to Copilot when generating code for this repository.

Which parts were AI-assisted
Example scripts and glue code such as examples/anchor-demo.js and scripts/run-local-chain.sh.

README drafts and documentation templates.

Small API handler scaffolds and CLI option parsing snippets.

How AI outputs were validated
Each AI-assisted file was manually reviewed for correctness, security, and alignment with the repository architecture.

Cryptographic operations and runtime extrinsic names were verified against on-chain expectations where applicable.

Tests or local smoke runs were performed for scripts included in the demo.

Data handling and privacy
No user PII, production secrets, or private keys were shared with Copilot during development.

The project keeps prover secrets and signing keys local to the developer environment and does not upload these artifacts to external AI services.

Reproducibility note
Because AI tools contributed to scaffolding, maintainers advise reviewers to treat generated code as a starting point and validate cryptographic and runtime assumptions before reusing in production.
