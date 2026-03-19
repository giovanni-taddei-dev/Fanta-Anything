// Shows the ranking of all participants with their scores.
// If no results have been revealed yet, shows a "pending" message.
import { computeLeaderboard } from "../data/mockData";

// Medal emojis for top 3 positions
const MEDALS = ["🥇", "🥈", "🥉"];
const RANK_CLASSES = ["top-1", "top-2", "top-3"];

export default function Leaderboard({ participants, events, choices, currentUserId }) {
  const ranked = computeLeaderboard(participants, events, choices);

  // Check if any event has a verified result
  const resultsRevealed = events.some((e) =>
    e.options.some((o) => o.is_correct !== null)
  );

  if (!resultsRevealed) {
    return (
      <div className="leaderboard-note">
        🕐 I risultati non sono ancora stati rivelati dall&apos;host. La classifica
        apparirà non appena verranno segnati i primi esiti.
      </div>
    );
  }

  return (
    <div className="leaderboard">
      {ranked.map(({ participant, score }, i) => {
        const isCurrentUser = participant.id === currentUserId;
        const rowClass = [
          "leaderboard-row",
          RANK_CLASSES[i] ?? "",
          isCurrentUser ? "current-user" : "",
        ]
          .join(" ")
          .trim();

        return (
          <div key={participant.id} className={rowClass}>
            {/* Rank: medal for top 3, number otherwise */}
            <span className="leaderboard-rank">
              {MEDALS[i] ?? `${i + 1}`}
            </span>

            <span className="leaderboard-name">
              {participant.display_name}
              {participant.is_host && (
                <span className="leaderboard-host-badge">host</span>
              )}
              {isCurrentUser && (
                <span className="leaderboard-host-badge" style={{ background: "#fef3c7", color: "#92400e" }}>
                  tu
                </span>
              )}
            </span>

            <div>
              <div className="leaderboard-score">{score}</div>
              <div className="leaderboard-score-label">pt</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
