# AI_USAGE.md

This repository is an AI-assisted prototype, primarily generated with Copilot. It is a demo-only prototype and not production-grade. The code is published under the MIT License.

**Tools and timeframe**
- Copilot; Oct–Nov 2025.

**Scope**
- Major scaffolding, serverless endpoints, frontends, docs, demo scripts, and this file were created or assisted by AI.

**Representative prompts**
- "Create Express endpoints /issue /get-proof /verify using precomputed_proofs.json."
- "Generate a Next.js issuer page that posts {userId,eventId} to /issue."

**Validation**
- Manual demo per docs/DEMO_SCRIPT.md.
- Smoke test (local): PASS — status endpoint responded at http://localhost:3004

**Limitations Required follow-ups**
- /verify is a deterministic demo stub; replace with a vetted wasm/JS verifier and verification_key.json before production.
- Precomputed proofs are used for the demo; replace with on-chain or live proof generation in production.
- Do not commit secrets or verification keys; use secure secret management.
- tmp_issuances.json (ephemeral demo storage) must be replaced with persistent or on-chain storage for production.

**Traceability**
- AI-assisted PRs include an "AI-assisted content" section with sanitized prompt and smoke-test result.
- Maintainer handle: @christianscode1994
- Maintainer sign off: @christianscode1994 — 24 Oct 2025
- Repo: https://github.com/christianscode1994/zk-presence-protocol
