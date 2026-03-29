import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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

  const filledQuestionsCount = useMemo(
    () => questions.filter((q) => q.title.trim().length > 0).length,
    [questions]
  );

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
    // Mockup only: backend integration will be wired later.
    window.alert(
      "Mockup UI: salvataggio non ancora collegato al back-end."
    );
  }

  return (
    <div className="create-page">
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

        <form className="create-form" onSubmit={handleSubmitMock}>
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
              >
                + Aggiungi domanda
              </button>
            </div>

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
            <button type="button" className="btn btn-ghost">
              Salva bozza
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!hostName.trim()}
            >
              Crea partita
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
