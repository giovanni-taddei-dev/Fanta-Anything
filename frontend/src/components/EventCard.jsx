// Renders a single prediction question with its clickable options.
// Props:
//   event         — { id, question, options: [{ id, label, is_correct }] }
//   index         — question number (for display)
//   selectedId    — the option the current user has chosen (controlled)
//   onChange      — called with (eventId, optionId) when the user clicks an option
//   readOnly      — if true, disables interaction (used after submission)

export default function EventCard({ event, index, selectedId, onChange, readOnly }) {
  // Determine if any result has been revealed for this event
  const hasResults = event.options.some((o) => o.is_correct !== null);

  function getOptionClass(option) {
    if (!hasResults) {
      // No results yet: just highlight the user's selection
      return selectedId === option.id ? "option-item selected" : "option-item";
    }
    // Results are known: show correct / wrong styling
    if (option.is_correct) return "option-item correct";
    if (selectedId === option.id && !option.is_correct) return "option-item wrong";
    return "option-item";
  }

  return (
    <div className="card">
      <p className="event-card-number">Domanda {index + 1}</p>
      <p className="event-card-question">{event.question}</p>

      <div className="option-list">
        {event.options.map((option) => (
          <div
            key={option.id}
            className={getOptionClass(option)}
            onClick={() => !readOnly && !hasResults && onChange(event.id, option.id)}
            style={{ cursor: readOnly || hasResults ? "default" : "pointer" }}
          >
            {/* Visual radio indicator (custom-styled, not a native <input>) */}
            <span className="option-radio">
              {selectedId === option.id && (
                <span className="option-radio-dot" />
              )}
            </span>

            <span className="option-label">{option.label}</span>

            {/* Result icon shown once host reveals outcomes */}
            {hasResults && (
              <span className="option-result-icon">
                {option.is_correct ? "✅" : ""}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
