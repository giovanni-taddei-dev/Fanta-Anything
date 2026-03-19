# Fanta-Anything

A social prediction game platform for private groups. Users create custom "fantasy" leagues for any real-life event (wedding, exam, sports match, etc.), make predictions, and earn points based on actual results.

Fanta-Anything is conceived as an exploratory project, useful both as a fun product and as a playground for rapid development and experimentation.

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
- ER model entities: FantaAnything, Event, Option, Participant, Choice

## Interaction Guidelines for the Agent

1. **Architectural explanations**: Every time a new technology, framework, or design pattern is introduced, briefly explain the "why" behind that choice and its advantages. Do not assume the user is familiar with frameworks outside of ML.

2. **Didactic code review**: Write comments in code to explain the logic of non-obvious sections. If the user proposes outdated or incorrect solutions, correct them by explaining the current best practice.

3. **Focus on DX (Developer Experience)**: Prefer modern, AI-friendly tools that minimize boilerplate.

## Language Conventions

- All code and anything code-related (schemas, models, variable names, comments) must be in English.
- Conversation with the user can be in Italian.
