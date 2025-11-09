import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CheckinForm() {
  const [eventId, setEventId] = useState("");
  const [commitment, setCommitment] = useState("");
  const [result, setResult] = useState(null);

  function makeCommitment() {
    const c = uuidv4();
    setCommitment(c);
  }

  async function submitCheckin(e) {
    e.preventDefault();
    if (!eventId || !commitment) {
      setResult({ error: "eventId and commitment required" });
      return;
    }
    const nonce = prompt("Prototype step: paste the current event nonce from organizer (rotate and copy).");
    if (!nonce) {
      setResult({ error: "nonce required for prototype proof" });
      return;
    }
    const proof = `valid:${eventId}:${nonce}`;
    const res = await fetch("/apps/web/api/checkin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-relayer-key": process.env.NEXT_PUBLIC_RELAYER_KEY || ""
      },
      body: JSON.stringify({ eventId, commitment, proof })
    });
    const j = await res.json();
    setResult(j);
  }

  return (
    <div className="card">
      <label>Event ID</label>
      <input value={eventId} onChange={(e) => setEventId(e.target.value)} placeholder="event-abc-1" />
      <label>Commitment (generated client-side)</label>
      <div style={{ display: "flex", gap: "8px" }}>
        <input readOnly value={commitment} placeholder="click Generate" />
        <button onClick={makeCommitment}>Generate</button>
      </div>
      <button onClick={submitCheckin}>Submit Check-in (prototype)</button>
      <pre>{result ? JSON.stringify(result, null, 2) : "No check-in yet"}</pre>
    </div>
  );
}
