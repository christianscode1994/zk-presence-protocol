import type { NextApiRequest, NextApiResponse } from "next";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { rootHex } = req.body;
  if (!rootHex) return res.status(400).json({ error: "rootHex required" });

  try {
    const provider = new WsProvider(process.env.POLKADOT_WS || "wss://westend-rpc.polkadot.io");
    const api = await ApiPromise.create({ provider });

    const keyring = new Keyring({ type: "sr25519" });
    // RELAYER_SEED must be set in Vercel env (DEV only: use development seed)
    const relayer = keyring.addFromUri(process.env.RELAYER_SEED as string);
    // example using remark if no pallet:
    const tx = api.tx.system.remark(rootHex);

    const hash = await tx.signAndSend(relayer);
    return res.status(200).json({ txHash: hash.toString() });
  } catch (e: any) {
    return res.status(500).json({ error: e.message || e.toString() });
  }
}
