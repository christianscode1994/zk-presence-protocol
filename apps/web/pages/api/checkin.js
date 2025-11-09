import { verifyMockProof } from "../../lib/zk/mockVerifier";
import { publishCommitment } from "../../lib/store";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const apiKey = req.headers["x-relayer-key"] || req.query.key;
  if (!apiKey || apiKey !== process.env.RELAYER_API_KEY) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const payload = req.body;
  if (!payload || !payload.eventId || !payload.commitment || !payload.proof) {
    return res.status(400).json({ error: "eventId, commitment and proof required" });
  }

  const ok = await verifyMockProof(payload);
  if (!ok) return res.status(400).json({ error: "invalid proof" });

  try {
    const root = await publishCommitment(payload.eventId, payload.commitment);
    return res.status(200).json({ ok: true, root });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
