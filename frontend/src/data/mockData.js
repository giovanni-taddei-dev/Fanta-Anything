// ─── Mock data mirroring the ER model ───────────────────────────────────────
// This file simulates what the backend API will eventually return.
// All IDs are strings (UUIDs in production).

export const mockGame = {
  id: "game-001",
  title: "FantaBimbo 2026 🍼",
  description:
    "Marco e Chiara aspettano il loro primo figlio! Fai le tue previsioni prima del grande giorno.",
  status: "open", // "open" | "closed"
  deadline: "2026-04-20T00:00:00",
  host_id: "p-marco",
};

// Each event is a question with multiple-choice options.
// is_correct: null = result not revealed yet | true = correct answer | false = wrong
export const mockEvents = [
  {
    id: "e-1",
    question: "Maschio o femmina?",
    options: [
      { id: "o-1a", label: "Maschio 👦", is_correct: null },
      { id: "o-1b", label: "Femmina 👧", is_correct: null },
    ],
  },
  {
    id: "e-2",
    question: "Quanto peserà alla nascita?",
    options: [
      { id: "o-2a", label: "Meno di 3 kg", is_correct: null },
      { id: "o-2b", label: "Tra 3 e 3,5 kg", is_correct: null },
      { id: "o-2c", label: "Più di 3,5 kg", is_correct: null },
    ],
  },
  {
    id: "e-3",
    question: "Quando nascerà rispetto alla data prevista?",
    options: [
      { id: "o-3a", label: "Prima del previsto ⏰", is_correct: null },
      { id: "o-3b", label: "Nella settimana prevista 📅", is_correct: null },
      { id: "o-3c", label: "Dopo il previsto 🐢", is_correct: null },
    ],
  },
  {
    id: "e-4",
    question: "Come si chiamerà?",
    options: [
      { id: "o-4a", label: "Sofia", is_correct: null },
      { id: "o-4b", label: "Giulia", is_correct: null },
      { id: "o-4c", label: "Emma", is_correct: null },
      { id: "o-4d", label: "Aurora", is_correct: null },
      { id: "o-4e", label: "Altro / Maschio → irrilevante", is_correct: null },
    ],
  },
];

export const mockParticipants = [
  { id: "p-marco", display_name: "Marco", is_host: true },
  { id: "p-giulia", display_name: "Giulia", is_host: false },
  { id: "p-luca", display_name: "Luca", is_host: false },
  { id: "p-sara", display_name: "Sara", is_host: false },
  { id: "p-franc", display_name: "Francesco", is_host: false },
];

// Existing choices from other participants (so the leaderboard has content).
// Format: { participant_id, event_id, option_id }
export const mockChoices = [
  // Marco's choices
  { participant_id: "p-marco", event_id: "e-1", option_id: "o-1b" },
  { participant_id: "p-marco", event_id: "e-2", option_id: "o-2b" },
  { participant_id: "p-marco", event_id: "e-3", option_id: "o-3b" },
  { participant_id: "p-marco", event_id: "e-4", option_id: "o-4a" },
  // Giulia's choices
  { participant_id: "p-giulia", event_id: "e-1", option_id: "o-1b" },
  { participant_id: "p-giulia", event_id: "e-2", option_id: "o-2c" },
  { participant_id: "p-giulia", event_id: "e-3", option_id: "o-3a" },
  { participant_id: "p-giulia", event_id: "e-4", option_id: "o-4b" },
  // Luca's choices
  { participant_id: "p-luca", event_id: "e-1", option_id: "o-1a" },
  { participant_id: "p-luca", event_id: "e-2", option_id: "o-2b" },
  { participant_id: "p-luca", event_id: "e-3", option_id: "o-3c" },
  { participant_id: "p-luca", event_id: "e-4", option_id: "o-4e" },
  // Sara's choices
  { participant_id: "p-sara", event_id: "e-1", option_id: "o-1b" },
  { participant_id: "p-sara", event_id: "e-2", option_id: "o-2a" },
  { participant_id: "p-sara", event_id: "e-3", option_id: "o-3b" },
  { participant_id: "p-sara", event_id: "e-4", option_id: "o-4c" },
  // Francesco's choices
  { participant_id: "p-franc", event_id: "e-1", option_id: "o-1a" },
  { participant_id: "p-franc", event_id: "e-2", option_id: "o-2b" },
  { participant_id: "p-franc", event_id: "e-3", option_id: "o-3b" },
  { participant_id: "p-franc", event_id: "e-4", option_id: "o-4d" },
];

// ─── Score calculation helper ────────────────────────────────────────────────
// Returns a sorted leaderboard array: [{ participant, score, choices }]
// Only counts events where at least one option has is_correct = true.
export function computeLeaderboard(participants, events, choices) {
  const correctOptions = new Set(
    events
      .flatMap((e) => e.options)
      .filter((o) => o.is_correct === true)
      .map((o) => o.id)
  );

  return participants
    .map((participant) => {
      const participantChoices = choices.filter(
        (c) => c.participant_id === participant.id
      );
      const score = participantChoices.filter((c) =>
        correctOptions.has(c.option_id)
      ).length;
      return { participant, score, choices: participantChoices };
    })
    .sort((a, b) => b.score - a.score);
}
