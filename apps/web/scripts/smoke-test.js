const fetch = require("node-fetch");

(async () => {
  try {
    const r = await fetch("http://localhost:3000/apps/web/api/status");
    const j = await r.json();
    if (!j || !j.ok) {
      console.error("Status API failed", j);
      process.exit(2);
    }
    console.log("Status OK");
  } catch (e) {
    console.error("Smoke test error", e.message);
    process.exit(2);
  }
})();
