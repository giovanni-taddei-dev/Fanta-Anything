// Asks "Chi sei?" — the user picks an existing participant or types a new name.
// This replaces a traditional login: frictionless, no passwords.
import { useState } from "react";

export default function IdentityPicker({ participants, onSelect }) {
  const [newName, setNewName] = useState("");

  function handleNewName() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    // Create a temporary in-memory participant object (no server call yet)
    onSelect({ id: `new-${trimmed}`, display_name: trimmed, is_host: false });
  }

  return (
    <div className="card identity-card">
      <h2>Chi sei? 👋</h2>
      <p className="subtitle">
        Seleziona il tuo nome tra i partecipanti oppure inseriscine uno nuovo.
      </p>

      {/* Existing participants as tappable chips */}
      <div className="participant-chips">
        {participants.map((p) => (
          <button key={p.id} className="chip" onClick={() => onSelect(p)}>
            {p.display_name}
            {p.is_host && " 👑"}
          </button>
        ))}
      </div>

      <div className="identity-divider">oppure</div>

      {/* New nickname input */}
      <div className="new-name-input">
        <input
          type="text"
          placeholder="Il tuo nickname..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleNewName()}
        />
        <button
          className="btn btn-primary"
          onClick={handleNewName}
          disabled={!newName.trim()}
        >
          Entra
        </button>
      </div>
    </div>
  );
}
