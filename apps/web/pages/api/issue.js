import { createEvent, rotateNonce, getEvent } from "../../lib/store";

export default async function handler(req, res) {
  const method = req.method;
  if (method === "POST") {
    const { organizer, eventId, startTs, endTs, metadata } = req.body || {};
    if (!organizer || !eventId) {
      return res.status(400).json({ error: "organizer and eventId required" });
    }
    try {
      const event = await createEvent({ organizer, eventId, startTs, endTs, metadata });
      return res.status(201).json({ ok: true, event });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
  if (method === "PATCH") {
    const { eventId } = req.body || {};
    if (!eventId) return res.status(400).json({ error: "eventId required" });
    try {
      const result = await rotateNonce(eventId);
      return res.status(200).json({ ok: true, nonce: result });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
  if (method === "GET") {
    const { eventId } = req.query || {};
    if (!eventId) return res.status(400).json({ error: "eventId required" });
    try {
      const ev = await getEvent(eventId);
      if (!ev) return res.status(404).json({ error: "not found" });
      return res.status(200).json({ ok: true, event: ev });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
  res.setHeader("Allow", "POST, PATCH, GET");
  res.status(405).end("Method Not Allowed");
}
