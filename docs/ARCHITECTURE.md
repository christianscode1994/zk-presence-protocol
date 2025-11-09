Architecture (prototype)

- Next.js front-end hosted on Vercel
- API routes in Next.js act as a relayer and anchor simulator
- Mock ZK verifier demonstrates proof verification flow
- Store persisted to file (apps/web/data/db.json) for local demo

Replacement plan for production:
- Replace mock verifier with a real WASM verifier or server verifier that consumes verification_key.json
- Replace the simulated anchor (publishCommitment) with calls to a Substrate pallet extrinsic (submit_root) via polkadot.js or a relayer signed account
- Implement the presence pallet and deploy as a parachain or runtime pallet
