Security Summary
Threat model
Actors

Honest users who follow intended check-in flows.

Malicious users attempting to forge presence or correlate events.

Malicious operators aiming to access proof secrets or tamper with anchors.

External attackers targeting APIs, provers, or the runtime.

Assets

ZK proofs and Merkle roots representing presence claims.

On-chain anchors and associated metadata.

Prover secrets, signing keys, and any off-chain storage containing seeds or nonces.

Capabilities assumed for attacker

Network access to public APIs and the frontend.

Ability to run nodes or call anchor scripts if endpoints accept public submissions.

No access to maintainers’ private signing keys or protected prover secrets in a correctly configured environment.

What zero-knowledge protects
Proofs assert presence or membership properties without revealing underlying identifiers.

The system avoids storing PII on-chain or in plaintext off-chain by anchoring only cryptographic roots.

Verifier logic ensures proofs are valid before anchors are produced.

Limitations and known risks
Proof unlinkability depends on correct use of nonces, salts, and epoch rotation. Reuse of static identifiers or salts can enable correlation.

If prover secrets or signing keys leak, an attacker could generate valid-looking anchors.

Replay attacks are possible if anchors lack temporal metadata and the verifier does not enforce nonces or expiry.

Frontend-based verification can be manipulated in compromised browsers; sensitive steps should be validated server-side or via signed attestations in higher-security deployments.

Mitigations included
Use ephemeral salts and per-event nonces when generating proofs.

Require server-side verification of client-submitted proofs before accepting anchor requests.

Sign anchor submission requests with a maintained service key and validate signatures in the runtime extrinsic if supported.

Rate-limit anchor endpoints and enforce per-event quota to reduce automated abuse.

Keep prover artifacts and any secret keys out of VCS and behind environment variables; never include private keys in demo commits.

Recommended hardening for production
Move prover and verification to dedicated secure enclaves or hardened serverless environments.

Use hardware-backed key management (HSM or cloud KMS) for signing anchor extrinsics.

Add audit logs for all anchor transactions and proof verifications.

Introduce multi-party attestation for high-impact anchors and implement threshold signing for critical operations.

Perform third-party cryptographic review and a bug bounty program before any public deployment.

Responsible disclosure
If you find a security vulnerability, open an issue labeled "security" or contact the maintainers privately via the GitHub profile contact method. Do not publish exploitable details publicly.
