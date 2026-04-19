import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const MAX_QUESTIONS = 8;

function createEmptyQuestion(id) {
  return {
    id: `q-${id}`,
    title: "",
    options: ["", ""],
  };
}

export default function CreateGamePage() {
  const [hostName, setHostName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [joinMode, setJoinMode] = useState("invite");
  const [questions, setQuestions] = useState([createEmptyQuestion(1)]);
  const [formFeedback, setFormFeedback] = useState(null);
  const [showValidationHints, setShowValidationHints] = useState(false);
  const [toast, setToast] = useState(null);

  const filledQuestionsCount = useMemo(
    () => questions.filter((q) => q.title.trim().length > 0).length,
    [questions]
  );
  const isMaxQuestionsReached = questions.length >= MAX_QUESTIONS;

  const validation = useMemo(() => {
    const errors = [];
    const warnings = [];
    const now = new Date();
    const trimmedHostName = hostName.trim();
    const trimmedTitle = title.trim();

    if (!trimmedHostName) errors.push("Inserisci il nome dell'host.");
    if (!trimmedTitle) errors.push("Inserisci un titolo per la partita.");
    if (!deadline) {
      errors.push("Imposta la scadenza per le previsioni.");
    } else if (new Date(deadline) <= now) {
      errors.push("La scadenza deve essere nel futuro.");
    }

    if (questions.length === 0) errors.push("Aggiungi almeno una domanda.");

    const invalidQuestionIndexes = questions
      .map((q, idx) => {
        const hasTitle = q.title.trim().length > 0;
        const filledOptions = q.options.filter((option) => option.trim().length > 0);
        if (!hasTitle || filledOptions.length < 2) return idx + 1;
        return null;
      })
      .filter(Boolean);

    if (invalidQuestionIndexes.length > 0) {
      errors.push(
        `Completa domanda e almeno 2 opzioni per: ${invalidQuestionIndexes
          .map((idx) => `#${idx}`)
          .join(", ")}.`
      );
    }

    if (description.trim().length > 180) {
      warnings.push("La descrizione e lunga: prova a restare entro 180 caratteri.");
    }

    return {
      errors,
      warnings,
      canSubmit: errors.length === 0,
    };
  }, [deadline, description, hostName, questions, title]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function handleQuestionTitleChange(questionId, value) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, title: value } : q))
    );
  }

  function handleOptionChange(questionId, optionIndex, value) {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId) return q;
        const nextOptions = [...q.options];
        nextOptions[optionIndex] = value;
        return { ...q, options: nextOptions };
      })
    );
  }

  function handleAddQuestion() {
    if (isMaxQuestionsReached) return;
    setQuestions((prev) => [...prev, createEmptyQuestion(prev.length + 1)]);
  }

  function handleRemoveQuestion(questionId) {
    setQuestions((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((q) => q.id !== questionId);
    });
  }

  function handleSubmitMock(event) {
    event.preventDefault();
    setShowValidationHints(true);
    if (!validation.canSubmit) {
      setFormFeedback({
        type: "error",
        message: "Completa i campi richiesti prima di creare la partita.",
      });
      setToast({
        type: "error",
        message: "Partita non creata: controlla i campi evidenziati.",
      });
      return;
    }
    setFormFeedback({
      type: "success",
      message: "Mock salvato: in seguito collegheremo la creazione al backend.",
    });
    setToast({
      type: "success",
      message: "Partita creata nel mock con successo.",
    });
    // Mockup only: backend integration will be wired later.
  }

  function handleSaveDraft() {
    setFormFeedback({
      type: "info",
      message: "Bozza salvata in locale (mock): nessun dato persistito su backend.",
    });
    setToast({
      type: "info",
      message: "Bozza salvata in locale.",
    });
  }

  return (
    <div className="create-page">
      {!!toast && (
        <div className={`toast toast-${toast.type}`} role="status" aria-live="polite">
          {toast.message}
        </div>
      )}
      <header className="create-header">
        <div className="create-header-inner">
          <p className="create-eyebrow">Nuovo FantaAnything</p>
          <h1>Crea la tua partita</h1>
          <p>
            Imposta titolo, scadenza e domande. In questa fase lavoriamo solo
            sull&apos;interfaccia.
          </p>
        </div>
      </header>

      <main className="create-body">
        <div className="create-topbar">
          <Link to="/" className="btn btn-ghost">
            ← Torna alla home
          </Link>
          <span className="create-progress">
            {filledQuestionsCount}/{questions.length} domande impostate
          </span>
        </div>

        {!!formFeedback && (
          <div className={`form-alert form-alert-${formFeedback.type}`}>
            {formFeedback.message}
          </div>
        )}

        {showValidationHints && !validation.canSubmit && (
          <div className="form-alert form-alert-error">
            <p className="form-alert-title">Ti manca ancora questo:</p>
            <ul>
              {validation.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {validation.warnings.length > 0 && (
          <div className="form-alert form-alert-warning">
            {validation.warnings.map((warning) => (
              <p key={warning}>{warning}</p>
            ))}
          </div>
        )}

        <form className="create-form" onSubmit={handleSubmitMock} noValidate>
          <section className="card create-section">
            <h2>Chi sei?</h2>
            <p className="text-muted">
              Prima di creare la partita, identificati come host.
            </p>
            <label className="field">
              <span>Nome / nickname host</span>
              <input
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                placeholder="Es. Gio / FantaMaster"
                required
              />
            </label>
          </section>

          <section className="card create-section">
            <h2>Informazioni base</h2>
            <div className="create-grid">
              <label className="field">
                <span>Titolo partita</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Es. Fanta Weekend a Barcellona"
                  required
                />
              </label>

              <label className="field">
                <span>Scadenza previsioni</span>
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </label>
            </div>

            <label className="field">
              <span>Descrizione</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Spiega in due righe il contesto della partita."
                rows={3}
              />
            </label>
          </section>

          <section className="card create-section">
            <h2>Modalita di partecipazione</h2>
            <div className="join-mode-options">
              <button
                type="button"
                className={`choice-chip ${joinMode === "invite" ? "selected" : ""}`}
                onClick={() => setJoinMode("invite")}
              >
                Link di invito
              </button>
              <button
                type="button"
                className={`choice-chip ${joinMode === "code" ? "selected" : ""}`}
                onClick={() => setJoinMode("code")}
              >
                Codice stanza
              </button>
            </div>
            <p className="text-muted">
              Mockup: la generazione di link/codice verra collegata in seguito.
            </p>
          </section>

          <section className="card create-section">
            <div className="create-section-head">
              <h2>Domande</h2>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleAddQuestion}
                disabled={isMaxQuestionsReached}
              >
                + Aggiungi domanda
              </button>
            </div>
            <p className="text-muted">
              Inserisci almeno 1 domanda completa. Massimo {MAX_QUESTIONS} domande.
            </p>

            <div className="question-list">
              {questions.map((question, index) => (
                <article key={question.id} className="question-item">
                  <div className="question-item-head">
                    <p className="question-index">Domanda {index + 1}</p>
                    <button
                      type="button"
                      className="question-remove"
                      onClick={() => handleRemoveQuestion(question.id)}
                      disabled={questions.length === 1}
                    >
                      Rimuovi
                    </button>
                  </div>

                  <label className="field">
                    <span>Testo domanda</span>
                    <input
                      value={question.title}
                      onChange={(e) =>
                        handleQuestionTitleChange(question.id, e.target.value)
                      }
                      placeholder="Es. Chi arrivera in ritardo al brunch?"
                      required
                    />
                  </label>

                  <div className="create-grid">
                    {question.options.map((option, optionIndex) => (
                      <label
                        key={`${question.id}-option-${optionIndex}`}
                        className="field"
                      >
                        <span>Opzione {optionIndex + 1}</span>
                        <input
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              question.id,
                              optionIndex,
                              e.target.value
                            )
                          }
                          placeholder={`Es. Opzione ${optionIndex + 1}`}
                          required
                        />
                      </label>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="create-actions">
            <button type="button" className="btn btn-ghost" onClick={handleSaveDraft}>
              Salva bozza
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Crea partita
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
