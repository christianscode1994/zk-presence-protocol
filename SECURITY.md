# Security.md

# Summary
This repository is a hackathon demo: a reproducible proof‑of‑concept that demonstrates an end‑to‑end issuer → user → verifier flow. Security choices prioritize reproducibility and clarity for judges over production hardening. This document lists demo limitations, quick judge checks, immediate mitigations to apply before public demo, a minimal hardening checklist, a short production roadmap, and reporting instructions.

---

# Demo scope and intent
- Purpose: show a privacy‑preserving presence proof concept with a deployable Next.js app on Vercel.  
- Intended audience: hackathon judges, reviewers, and maintainers assessing reproducibility and basic safety.  
- Not intended for: production use, handling sensitive personal data, or any high‑assurance security guarantees.

---

# Key demo limitations
- Demo signature: issuance is HMAC‑signed using DEMO_ISSUER_KEY for basic integrity only; this is not a production signature scheme.  
- Proof verification: proofs are matched against a shipped precomputed store (precomputed_proofs.json) rather than verified by a trustless zk verifier.  
- Ephemeral storage: apps/web/data/tmp_issuances.json is serverless, ephemeral, and not access‑controlled.  
- Secrets: DEMO_ISSUER_KEY (demo secret) can forge demo tokens if exposed.  
- Artifacts: verifier.wasm and verification_key.json may be placeholders and are not validated for production.  
- No auth or rate limits: /api/issue currently lacks authentication, authorization, and rate limiting.  
- No replay protection: issued tokens do not enforce strong nonces/TTLs in the demo flow.

---

# Quick judge checklist (what to verify in ~60 seconds)
1. Health: GET /api/status returns 200 with a timestamp.  
2. Issue: POST /api/issue returns a signed issuance object (payload + hmac).  
3. Store: apps/web/data/tmp_issuances.json records the issuance (demo only).  
4. Get proof: GET /api/get-proof returns the stored proof and the signed issuance.  
5. Verify: POST /api/verify with returned proof and signed object yields `{ "verified": true }` for the shipped demo proof.  
6. Provenance: AI_USAGE.md contains the exact smoke-test PASS line and final commit SHA.  
7. Artifacts: apps/web/prover-artifacts exists and contains only non‑secret demo artifacts.

---

# Immediate mitigations (apply before publishing demo URL)
- Remove secrets from the repository; do not commit DEMO_ISSUER_KEY or any real private keys.  
- Set DEMO_ISSUER_KEY only in Vercel project secrets (or equivalent secret manager) and never commit it.  
- Mark tmp_issuances.json and precomputed_proofs.json explicitly as demo‑only in README and docs.  
- Commit only public/non‑secret prover artifacts; relocate any private artifacts to secure storage.  
- Publish the exact PASS output from apps/web/scripts/run-tests.js in AI_USAGE.md and include the final commit SHA.  
- Limit broad distribution of the demo URL during the event and rotate demo secrets after the hackathon.

---

# Minimal hackathon‑ready checklist (must complete)
- [ ] No secrets committed to version control.  
- [ ] DEMO_ISSUER_KEY set in Vercel secrets for the deployed project.  
- [ ] apps/web/prover-artifacts contains only non‑secret demo artifacts.  
- [ ] apps/web/data/tmp_issuances.json is present as `{}` and explicitly documented as demo‑only.  
- [ ] apps/web/scripts/run-tests.js prints PASS when run against deployed URL and AI_USAGE.md includes the exact PASS line and commit SHA.  
- [ ] README includes a one‑click 60‑second judge checklist and the public Vercel URL.  
- [ ] Include three screenshots or a short GIF showing Issuer → User → Merchant verify flow.

---

# Short production roadmap (high level)
1. Key management: move issuer keys to a managed secret store (KMS, Vault, platform secrets) and implement key rotation with key identifiers.  
2. Strong signatures: replace HMAC demo with asymmetric signatures or on‑chain attestations and verify signatures cryptographically.  
3. Verifier integrity: adopt a vetted wasm or server‑side verifier, pin binary hashes in CI, and publish reproducible build artifacts.  
4. Durable storage: replace tmp_issuances.json with authenticated, access‑controlled persistent storage (DB or on‑chain commitments).  
5. Auth and rate limiting: require authenticated/authorized access to issuer APIs; add rate limiting and input validation.  
6. Freshness and replay protection: include nonces, short TTLs, or one‑time identifiers and enforce them during verification.  
7. Auditing and monitoring: emit structured audit logs to an append‑only store and add alerting for anomalous activity.

---

# Operational rules for demo maintainers
- Never commit production secrets or private keys to the repo. If a secret is accidentally committed, rotate it immediately and remove it from history.  
- Use platform secret storage (Vercel secrets, cloud KMS) for any keys used in the deployed demo.  
- Rotate demo keys after the event.  
- Keep sensitive data out of logs and public artifacts; sanitize logs before publishing.  
- Clearly label demo-only files and artifacts in the repository.

---

# Liability and disclosure
This document describes technical risks and mitigations for a hackathon demo. It is not legal advice and does not remove or limit legal liability. To reduce legal exposure: do not publish production secrets, avoid processing real sensitive personal data in the demo, add clear user‑facing disclaimers in the README, and consult legal counsel or your organization’s compliance team before any public or production use.

---

# Reporting security issues
If you discover a security vulnerability, open a repo issue labeled `security` with reproduction steps and suggested remediation, and notify the maintainer listed in AI_USAGE.md. Preserve any sensitive disclosure details privately until a fix or coordinated disclosure is arranged.
