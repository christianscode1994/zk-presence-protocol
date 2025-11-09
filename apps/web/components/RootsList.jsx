import React, { useEffect, useState } from "react";

export default function RootsList() {
  const [roots, setRoots] = useState({});

  useEffect(() => {
    async function load() {
      const r = await fetch("/apps/web/api/roots");
      const j = await r.json();
      setRoots(j.roots || {});
    }
    load();
  }, []);

  return (
    <div className="card">
      {Object.keys(roots).length === 0 && <div>No roots published yet</div>}
      {Object.entries(roots).map(([eid, arr]) => (
        <div key={eid} style={{ marginBottom: 12 }}>
          <h4>{eid}</h4>
          <ul>
            {arr.map((r) => (
              <li key={r.root}>
                <strong>root:</strong> {r.root} <strong>batch:</strong> {r.batchIndex} <strong>ts:</strong>{" "}
                {new Date(r.createdAt).toISOString()}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
