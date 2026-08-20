# Ambiente skill del progetto

Le skill vivono in `.claude/skills/` e sono **versionate nel repo**: valgono per
qualsiasi sessione di Claude Code aperta su questo progetto, locale o remota,
senza bisogno di installarle a mano ogni volta.

Sono vendorizzate (copiate, non sottomoduli) per una ragione precisa: una sessione
remota parte da un clone del repo e non ha modo di installare plugin. Il prezzo
e' che gli aggiornamenti upstream vanno ripresi manualmente.

## Cosa c'e' dentro

| Gruppo | Skill | Origine |
|---|---|---|
| Workflow | brainstorming, writing-plans, executing-plans, test-driven-development, systematic-debugging, verification-before-completion, requesting/receiving-code-review, subagent-driven-development, dispatching-parallel-agents, using-git-worktrees, finishing-a-development-branch, writing-skills, using-superpowers | obra/superpowers |
| Minimalismo | ponytail, ponytail-review | DietrichGebert/ponytail |
| Ingegneria | domain-modeling, codebase-design, to-spec, implement, diagnosing-bugs, research, prototype, improve-codebase-architecture, wayfinder, triage, resolving-merge-conflicts, handoff | mattpocock/skills |
| Diff | explain-diff (include il flag `--html`) | Chris-Graffagnino/explain-diff |
| Design | frontend-design | anthropics/skills |
| Design | ui-ux-pro-max, design-system, brand | nextlevelbuilder/ui-ux-pro-max-skill |
| Design | design-taste-frontend, minimalist-ui, high-end-visual-design, full-output-enforcement | Leonxlnx/taste-skill |

Le licenze originali sono conservate nelle rispettive cartelle.

## Modifiche applicate

- `ui-ux-pro-max/SKILL.md`: i percorsi `${CLAUDE_PLUGIN_ROOT}/...` sono stati
  riscritti in `.claude/skills/ui-ux-pro-max/scripts/search.py`, relativi alla
  radice del repo. La skill era pensata per l'installazione come plugin; come
  skill di progetto quella variabile non e' popolata e lo script non partirebbe.
- Le cartelle delle skill di `taste-skill` sono state rinominate per combaciare
  con il campo `name` del frontmatter (es. `taste` -> `design-taste-frontend`).

## Cosa e' stato lasciato fuori, di proposito

- `tdd` e `code-review` di mattpocock: si sovrappongono a `test-driven-development`
  di superpowers e alla `/code-review` gia' presente in Claude Code.
- `ui-styling` di ui-ux-pro-max: 5,8 MB di font per rendering su canvas, inutili
  per una web app che usa i Google Fonts.
- Gli hook di bootstrap di superpowers: sono meccanica da plugin, non
  trasferibile a una skill di progetto.
- Le varianti `imagegen-*`, `stitch`, `image-to-code`, `brutalist` di taste-skill
  e le skill `slides` / `banner-design` di ui-ux-pro-max: fuori tema.

## Nota sulla sovrapposizione delle skill di design

Ce ne sono tre famiglie che fanno un lavoro simile: `frontend-design` (direzione
estetica, sobria), `ui-ux-pro-max` (database ricercabile di stili, palette,
font, linee guida UX) e `design-taste-frontend` (anti-slop, opinionata).
Convivono, ma su uno stesso task tendono a tirare in direzioni diverse:
meglio nominare esplicitamente quale si vuole usare.
