import React from "react";
import EventCreator from "../components/EventCreator";
import CheckinForm from "../components/CheckinForm";
import RootsList from "../components/RootsList";
import "../styles/globals.css";

export default function Home() {
  return (
    <div className="container">
      <header>
        <h1>{process.env.NEXT_PUBLIC_APP_NAME || "ZK Presence Prototype"}</h1>
        <p>Privacy-preserving presence ledger prototype (mock verifier + simulated anchor)</p>
        <hr />
      </header>

      <main>
        <section>
          <h2>Organizer</h2>
          <EventCreator />
        </section>

        <section>
          <h2>User check-in</h2>
          <CheckinForm />
        </section>

        <section>
          <h2>Published roots (simulated ledger)</h2>
          <RootsList />
        </section>
      </main>

      <footer>
        <p>Support: {process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@example.com"}</p>
      </footer>
    </div>
  );
}
