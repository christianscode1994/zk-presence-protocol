Threat model summary (prototype)

- Stored data is minimal; events have nonces that rotate.
- Proving keys are not included. This prototype uses a mock verifier.
- Secrets: RELAYER_API_KEY must be set as an environment variable in Vercel. Never check it into Git.

Production security notes:
- Use HTTPS only; Vercel enforces HTTPS by default.
- Use proper authentication between frontend and relayer; use signed JWTs or OAuth tokens and rotate keys.
- Keep proving keys off-repo; keep private keys offline or in HSM.
- When adding Substrate pallet: ensure validators/relayers are authenticated and extrinsic submission uses a limited, dedicated account with restricted balance.
