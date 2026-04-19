// The landing page. For now it only links to a sample game (mock data).
// In production, this would have a "Create game" form and a "Join by code" input.
import { Link } from "react-router-dom";

const SAMPLE_GAME_ID = "game-001";

const steps = [
  {
    icon: "✏️",
    title: "L'host crea il gioco",
    desc: "Definisce il tema, le domande e invita i partecipanti tramite link.",
  },
  {
    icon: "🗳️",
    title: "I partecipanti votano",
    desc: "Ognuno inserisce le proprie previsioni prima della scadenza.",
  },
  {
    icon: "🏆",
    title: "L'host rivela i risultati",
    desc: "L'app calcola i punteggi e mostra la classifica finale.",
  },
];

export default function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <p className="ui-status-pill">Stato UI: prototipo navigabile (dati mock)</p>
        <h1>Fanta-Anything 🎲</h1>
        <p>
          Il fantacalcio di qualsiasi evento della vita reale. Nascite,
          matrimoni, viaggi, serate — fai le tue previsioni e sfida chi conosci.
        </p>
        <div className="home-hero-actions">
          <Link to="/crea" className="btn btn-primary">
            + Crea un nuovo FantaAnything
          </Link>
          {/* Link to sample game so you can explore the UI immediately */}
          <Link to={`/fanta/${SAMPLE_GAME_ID}`} className="btn btn-outline">
            Vedi una partita di esempio →
          </Link>
        </div>
      </div>

      <div className="home-body">
        <div className="how-it-works">
          <h2>Come funziona</h2>
          <div className="steps">
            {steps.map((s) => (
              <div key={s.title} className="step">
                <span className="step-icon">{s.icon}</span>
                <div className="step-text">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
