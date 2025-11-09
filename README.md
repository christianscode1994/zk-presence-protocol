# ZK Presence Protocol — Vercel Prototype

One-click Vercel-ready prototype demonstrating a privacy-preserving presence ledger flow:
organizer creates events, users check in, a relayer verifies proofs (mock) and publishes presence roots (simulated on-chain).

Quick start (local)
1. Install pnpm: `npm i -g pnpm`
2. Install deps: `pnpm install`
3. Run locally: `pnpm dev:web`
4. Open: http://localhost:3000

Deploy
- Create a Vercel project pointing to this repo
- Configure Environment Variables in Vercel using `.env.example` values (set RELAYER_API_KEY to a secure value)
- Push to GitHub; Vercel will build and deploy automatically

Docs
- docs/ARCHITECTURE.md
- docs/THREAT_MODEL.md
- docs/DEPLOYMENT.md

Production integration notes
- Replace the mock verifier in apps/web/lib/zk/mockVerifier.js with a real verifier (wasm/server).
- Replace file DB with a real DB or read roots from your Substrate pallet via polkadot.js.
