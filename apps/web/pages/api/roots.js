import { listRoots } from "../../lib/store";

export default async function handler(req, res) {
  const roots = await listRoots();
  res.status(200).json({ ok: true, roots });
}
