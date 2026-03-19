// The main game screen. Accessible via /fanta/:id
// Manages three states: identify → vote → (leaderboard visible at any time via tab)
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  mockGame,
  mockEvents,
  mockParticipants,
  mockChoices,
} from "../data/mockData";
import IdentityPicker from "../components/IdentityPicker";
import EventCard from "../components/EventCard";
import Leaderboard from "../components/Leaderboard";

// Format a date string into a readable Italian format
function formatDeadline(isoString) {
  return new Date(isoString).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function GamePage() {
  // In production, :id would be used to fetch game data from the API
  const { id } = useParams();

  // ── UI state ──────────────────────────────────────────────────────────────
  // currentUser: the participant who identified themselves
  const [currentUser, setCurrentUser] = useState(null);
  // activeTab: which main section is visible
  const [activeTab, setActiveTab] = useState("vote");
  // userChoices: { [eventId]: optionId } — tracks the user's in-progress selections
  const [userChoices, setUserChoices] = useState({});
  // hasSubmitted: true after the user confirms their choices
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // ── Derived data ──────────────────────────────────────────────────────────
  // Merge the current user's choices into the global list for the leaderboard
  const allChoices = useMemo(() => {
    if (!currentUser || !hasSubmitted) return mockChoices;
    // Remove any previous choices by the same user (in case they re-voted in the mockup)
    const filtered = mockChoices.filter(
      (c) => c.participant_id !== currentUser.id
    );
    const newChoices = Object.entries(userChoices).map(([eventId, optionId]) => ({
      participant_id: currentUser.id,
      event_id: eventId,
      option_id: optionId,
    }));
    return [...filtered, ...newChoices];
  }, [currentUser, hasSubmitted, userChoices]);

  // All participants including a newly created one (not in the mock list)
  const allParticipants = useMemo(() => {
    if (!currentUser) return mockParticipants;
    const exists = mockParticipants.find((p) => p.id === currentUser.id);
    return exists ? mockParticipants : [...mockParticipants, currentUser];
  }, [currentUser]);

  // How many questions the user has answered so far
  const answeredCount = Object.keys(userChoices).length;
  const totalEvents = mockEvents.length;

  // ── Handlers ──────────────────────────────────────────────────────────────
  function handleIdentify(participant) {
    setCurrentUser(participant);
    // If this participant already has choices in mock data, pre-populate the form
    const existing = mockChoices.filter(
      (c) => c.participant_id === participant.id
    );
    if (existing.length > 0) {
      const preloaded = Object.fromEntries(
        existing.map((c) => [c.event_id, c.option_id])
      );
      setUserChoices(preloaded);
    }
    setHasSubmitted(false);
  }

  function handleOptionChange(eventId, optionId) {
    setUserChoices((prev) => ({ ...prev, [eventId]: optionId }));
  }

  function handleSubmit() {
    setHasSubmitted(true);
    // In production: POST /fanta/:id/choices with userChoices
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="game-header">
        <div className="game-header-inner">
          <h1>{mockGame.title}</h1>
          <p>{mockGame.description}</p>
          <div className="game-meta">
            <span className="game-badge">📅 Scadenza: {formatDeadline(mockGame.deadline)}</span>
            <span className="game-badge">👥 {mockParticipants.length} partecipanti</span>
            <span className="game-badge">❓ {mockEvents.length} domande</span>
          </div>
        </div>
      </div>

      {/* ── Tab bar ─────────────────────────────────────────────────────── */}
      <div className="tab-bar">
        <div className="tab-bar-inner">
          <button
            className={`tab-btn ${activeTab === "vote" ? "active" : ""}`}
            onClick={() => setActiveTab("vote")}
          >
            🗳️ Previsioni
          </button>
          <button
            className={`tab-btn ${activeTab === "leaderboard" ? "active" : ""}`}
            onClick={() => setActiveTab("leaderboard")}
          >
            🏆 Classifica
          </button>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="game-body">

        {/* ── "Chi sei?" — shown until user identifies themselves ─────── */}
        {!currentUser && (
          <IdentityPicker
            participants={mockParticipants}
            onSelect={handleIdentify}
          />
        )}

        {/* ── User bar — shown after identification ────────────────────── */}
        {currentUser && (
          <div className="user-bar">
            <span>
              Stai giocando come{" "}
              <span className="user-bar-name">{currentUser.display_name}</span>
              {currentUser.is_host && " 👑"}
            </span>
            <button
              className="user-bar-change"
              onClick={() => {
                setCurrentUser(null);
                setUserChoices({});
                setHasSubmitted(false);
              }}
            >
              Cambia
            </button>
          </div>
        )}

        {/* ── VOTE TAB ─────────────────────────────────────────────────── */}
        {activeTab === "vote" && (
          <>
            {!currentUser && (
              <p className="text-muted text-center">
                Seleziona il tuo nome per iniziare a votare.
              </p>
            )}

            {/* Submitted confirmation */}
            {currentUser && hasSubmitted && (
              <div className="card submitted-card">
                <div className="submitted-icon">🎉</div>
                <h2>Previsioni inviate!</h2>
                <p>
                  Hai risposto a {answeredCount} domande su {totalEvents}.
                  Aspetta che l&apos;host riveli i risultati.
                </p>
              </div>
            )}

            {/* Voting form */}
            {currentUser && !hasSubmitted &&
              mockEvents.map((event, i) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={i}
                  selectedId={userChoices[event.id]}
                  onChange={handleOptionChange}
                />
              ))}

            {/* Submit button */}
            {currentUser && !hasSubmitted && (
              <div className="vote-submit">
                <p className="vote-progress">
                  {answeredCount} / {totalEvents} domande risposte
                </p>
                <button
                  className="btn btn-primary btn-full"
                  onClick={handleSubmit}
                  disabled={answeredCount === 0}
                >
                  Invia le mie previsioni ✉️
                </button>
              </div>
            )}
          </>
        )}

        {/* ── LEADERBOARD TAB ──────────────────────────────────────────── */}
        {activeTab === "leaderboard" && (
          <Leaderboard
            participants={allParticipants}
            events={mockEvents}
            choices={allChoices}
            currentUserId={currentUser?.id}
          />
        )}
      </div>
    </div>
  );
}
