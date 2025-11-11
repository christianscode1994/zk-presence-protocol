zk-presence-protocol
Zero-knowledge presence protocol for privacy-preserving check-ins and verifiable attendance

Tagline
Privacy-first attendance and presence proofs anchored on Polkadot parachains.

Project overview
zk-presence-protocol is a proof-of-concept system that lets users prove presence or §attendance without revealing personal identifiers. Proofs are generated with zero-knowledge primitives off-chain, verified client-side, and Merkle roots or anchors are committed on-chain via a Substrate pallet designed for parachain deployment. The project demonstrates end-to-end flow: event creation, user check-in, proof generation, proof verification, and on-chain anchoring.

What this repo contains
Substrate pallet: pallet-root-anchoring for storing anchors on-chain.

Frontend: apps/web (Next.js) demo UI for events and check-ins.

Prover artifacts: WASM / prover scaffolding and demo proofs.

Serverless APIs: examples of verifier endpoints and anchor submission handlers.

Examples and scripts: examples/anchor-demo.js and scripts/run-local-chain.sh for local/testnet demos.

Docs: ARCHITECTURE, THREAT_MODEL, DEPLOYMENT, and this README.

Important notes
Prototype status This project is a proof-of-concept prototype for demonstration and evaluation purposes only. It is not production-ready and should not be used in production environments without further review, testing, and hardening.

AI assistance used Substantial parts of this repository (boilerplate, scripts, examples, and documentation drafts) were generated with the help of Copilot. All generated content was reviewed and adapted by the maintainers.

Open-source license and liability This repository is released under the MIT License. The software is provided "as is", without warranty of any kind. The authors and contributors disclaim all liability arising from use of the software, including but not limited to direct, indirect, incidental, or consequential damages. Users are responsible for performing their own risk assessments and legal reviews before reusing or deploying any part of this project.

Quickstart
Install repository dependencies at repo root or appropriate workspace package:

npm install @polkadot/api @polkadot/util-crypto commander dotenv

pnpm install or npm install for web app in apps/web

Start a local Substrate dev node with the runtime that includes pallet-root-anchoring:

chmod +x scripts/run-local-chain.sh

./scripts/run-local-chain.sh &

Run the anchor demo to submit a sample root:

node examples/anchor-demo.js --endpoint ws://127.0.0.1:9944 --seed //Alice

Start the web demo (apps/web):

cd apps/web

pnpm dev or npm run dev

Follow the UI to create an event, perform a demo check-in, generate the proof, and verify before anchoring.

Polkadot integration
On-chain components

pallet-root-anchoring stores Merkle roots or event anchors on-chain.

examples/anchor-demo.js uses @polkadot/api to submit extrinsics to the runtime.

Off-chain components

Prover (WASM) generates proofs off-chain and is used by the frontend or serverless APIs.

Frontend verifies proofs client-side and invokes anchor submission APIs when verification passes.

Parachain story

Target deployment: a custom parachain or parathread on Polkadot Cloud built from the Substrate parachain template.

Rationale: parachain deployment provides finality, cross-chain messaging, and native parachain resources for large-scale verification or coordination.

What judges should try
Start local node and run anchor-demo.js. . Expect a tx hash printed to console and an "Included in block" message.

Start the web demo, create an event, follow demo check-in flow, generate and verify a proof, then anchor. Expect UI verification success and a visible anchor transaction in console or README example.

Inspect examples/anchor-demo.js to see how polkadot-js is used and scripts/run-local-chain.sh to spin up a dev node. Judges scoring technical integration should be able to reproduce in under 10 minutes.


Next steps and roadmap
Replace mock verifier with the WASM verifier artifact and integrate end-to-end proof verification.

Deploy the pallet to a Polkadot Cloud preview or Westend and include anchored txs.

Improve UX and hardened key handling, add rate limits and audit logging.

Contact and contributors
Repository maintainer: christian (see GitHub profile)

Report issues: open a GitHub Issue labeled "security" for vulnerabilities.
