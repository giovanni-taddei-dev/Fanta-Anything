# Fanta-Anything — Replit Environment

> For project documentation (concept, scope, tech stack, ER model, etc.) refer to the `docs/` folder, which is the single source of truth.

## Environment Setup

- **Frontend**: React + Vite, runs on port 5000
- **Workflow**: `cd frontend && npm run dev`
- **Deployment**: static site — build `cd frontend && npm run build`, public dir `frontend/dist`

## Interaction Guidelines for the Agent

1. **Architectural explanations**: Every time a new technology, framework, or design pattern is introduced, briefly explain the "why" behind that choice and its advantages. Do not assume the user is familiar with frameworks outside of ML.

2. **Didactic code review**: Write comments in code to explain the logic of non-obvious sections. If the user proposes outdated or incorrect solutions, correct them by explaining the current best practice.

3. **Focus on DX (Developer Experience)**: Prefer modern, AI-friendly tools that minimize boilerplate.

## Language Conventions

- All code and anything code-related (schemas, models, variable names, comments) must be in English.
- Conversation with the user can be in Italian.
