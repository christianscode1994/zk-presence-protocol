import React, { useEffect, useState } from "react";

export default function RootsList() {
  const [roots, setRoots] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const r = await fetch("/api/roots");
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const j = await r.json();
        if (mounted) setRoots(j.roots || {});
      } catch (err) {
        if (mounted) setError(String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="card">Loading roots…</div>;
  if (error) return <div className="card">Error loading roots: {error}</div>;

  return (
    <div className="card">
      {Object.keys(roots).length === 0 && <div>No roots published yet</div>}
      {Object.entries(roots).map(([eid, arr]) => (
        <div key={eid} style={{ marginBottom: 12 }}>
          <h4>{eid}</h4>
          <ul>
            {arr.map((r) => (
              <li key={r.root}>
                <strong>root:</strong> {r.root}{" "}
                <strong>batch:</strong> {r.batchIndex}{" "}
                <strong>ts:</strong>{" "}
                {r.createdAt ? new Date(r.createdAt).toISOString() : "—"}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
