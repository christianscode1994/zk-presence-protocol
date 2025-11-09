import { getEvent } from "../store";

export async function verifyMockProof({ eventId, commitment, proof }) {
  if (!proof || typeof proof !== "string") return false;
  const parts = proof.split(":");
  if (parts.length !== 3) return false;
  const [tag, pEvent, nonce] = parts;
  if (tag !== "valid" || pEvent !== eventId) return false;

  const ev = await getEvent(eventId);
  if (!ev) return false;
  if (ev.nonce !== nonce) return false;

  if (typeof commitment !== "string" || commitment.length < 8) return false;

  return true;
}
