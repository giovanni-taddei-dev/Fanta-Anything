# Fanta-Anything

A social prediction game platform for private groups. Users create custom "fantasy" leagues for any real-life event (wedding, exam, sports match, etc.), make predictions, and earn points based on actual results.

## Architecture

- **Frontend**: React 19 + Vite 7, served on port 5000
- **Backend**: Python 3 + FastAPI (early stage, single endpoint `POST /fanta`)

## Project Structure

```
frontend/        # React + Vite frontend
  src/
    App.jsx      # Main React component
    main.jsx     # Entry point
  vite.config.js # Vite config (host: 0.0.0.0, port: 5000, allowedHosts: true)
backend/
  app/
    main.py      # FastAPI app with /fanta endpoint
docs/            # Project documentation and specs
```

## Running the App

The frontend runs via the "Start application" workflow:
```
cd frontend && npm run dev
```

## Deployment

Configured as a static site deployment:
- Build: `cd frontend && npm run build`
- Public dir: `frontend/dist`

## Key Design Decisions

- No authentication (uses link + nickname approach to minimize friction)
- The backend is in early development; no database connected yet
- ER model entities: FantaAnything, Evento, Opzione, Partecipante, Scelta
