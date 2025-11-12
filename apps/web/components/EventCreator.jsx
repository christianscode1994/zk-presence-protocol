import React, { useState } from "react";

export default function EventCreator() {
  const [eventId, setEventId] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function createEvent(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizer: "organizer1", eventId })
      });
      const j = await res.json();
      setStatus(j);
    } catch (err) {
      setStatus({ error: String(err) });
    } finally {
      setLoading(false);
    }
  }

  async function rotate(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/issue", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId })
      });
      const j = await res.json();
      setStatus(j);
    } catch (err) {
      setStatus({ error: String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <form onSubmit={createEvent}>
        <label>Event ID</label>
        <input value={eventId} onChange={(e) => setEventId(e.target.value)} placeholder="e.g., event-abc-1" />
        <button type="submit" disabled={loading || !eventId}>Create Event</button>
      </form>

      <form onSubmit={rotate}>
        <input value={eventId} onChange={(e) => setEventId(e.target.value)} placeholder="event id to rotate nonce" />
        <button type="submit" disabled={loading || !eventId}>Rotate Nonce</button>
      </form>

      <pre>{status ? JSON.stringify(status, null, 2) : "No actions yet"}</pre>
    </div>
  );
}
