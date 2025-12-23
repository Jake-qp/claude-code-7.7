# Project: [Name]

> [One sentence: what this does and for whom]

## Stack

- **Framework:** [Next.js / React / etc.]
- **Language:** [TypeScript / JavaScript]
- **Database:** [PostgreSQL / MongoDB / etc.]
- **Styling:** [Tailwind / CSS Modules / etc.]

## Commands

```bash
npm run dev      # Start dev server
npm test         # Run tests
npm run build    # Production build
npm run lint     # Linting
```

### New Project Tips

**If tests fail with "No tests found":**
```json
{
  "scripts": {
    "test": "jest --passWithNoTests"
  }
}
```

**Recommended Jest config (jest.config.js):**
```javascript
module.exports = {
  testPathIgnorePatterns: ['/node_modules/'],
  // Add other ignores as needed: '/dist/', '/build/'
};
```

## Structure

```
src/
  app/           # App directory
  components/    # UI components
  lib/           # Utilities
```

## Conventions

- [Your code style rules]
- [Your naming conventions]
- [Any gotchas]

---

## Claude Code V7.7

### Quick Reference

| Need | Command | Phases |
|------|---------|--------|
| Tiny change (<20 lines, no deps) | `/quick "change"` | Make → Test → Commit |
| Small change (<50 lines) | `/quick "change"` | Verify? → Make → Test → Commit |
| New feature | `/build "feature"` | Init? → Spec → Design → Verify → Plan → Build → Review → Finish |
| Explore vague idea | `/brainstorm "idea"` | Dialogue → Options → Decide |
| Fix bug | `/fix "bug"` | Reproduce → Fix → Verify |
| Batch overnight | `/batch` | Process all `[ ]` tasks |
| Production check | `/launch` | Security → Performance → Reliability → Ops → Docs |

---

### Skills (20 Total)

Skills provide domain expertise and generate documentation as they work.

#### Process Skills (9)

| Skill | When | Generates |
|-------|------|-----------|
| `brainstorm` | Vague ideas needing exploration | - |
| `spec` | Defining who/what/success for features | - |
| `design` | UI mockups, API contracts | - |
| `verify-api` | Before using external libraries/APIs | - |
| `implementation-plan` | Breaking work into tasks | - |
| `tdd` | Writing tests, then implementation | - |
| `debugging` | Fixing bugs systematically | - |
| `security` | Auth, payments, PII features | docs/AUTH-FLOWS.md, docs/SECURITY.md |
| `verification` | Before claiming completion | - |

#### Domain Skills (11)

| Skill | When | Generates |
|-------|------|-----------|
| `ui-design` | Visual design, components | DESIGN-SYSTEM.md |
| `frontend` | React/Vue, state, data fetching | (follows DESIGN-SYSTEM.md) |
| `backend` | APIs, auth, business logic | docs/API-CONTRACTS.md |
| `database` | Schema, queries, migrations | docs/DATA-MODELS.md |
| `testing` | Jest, Playwright, E2E setup | - |
| `performance` | Optimization, Core Web Vitals | - |
| `accessibility` | WCAG compliance | - |
| `devops` | CI/CD, deployment | docs/DEPLOYMENT.md, docs/RUNBOOK.md, docs/MONITORING.md |
| `integration` | Stripe, Auth0, third-party | Appends to docs/API-CONTRACTS.md |
| `mobile` | React Native, Expo | - |
| `documentation` | README, guides | README.md |

---

### Agents (4)

| Agent | Purpose | Tools | When |
|-------|---------|-------|------|
| `initializer` | Project setup (Anthropic two-agent pattern) | Read, Write, Bash | First /build, missing ARCHITECTURE.md |
| `explorer` | Read-only codebase investigation | Read, Grep, Glob | "Find all X", "Investigate Y" |
| `reviewer` | Code review + doc check | Read, Grep, Bash | Before commit, /review |
| `researcher` | External API verification | Read, WebFetch, WebSearch | Third-party APIs, unfamiliar libraries |

---

### Document Generation

Skills automatically generate and update documentation:

| Event | Document Created |
|-------|-----------------|
| First /build | ARCHITECTURE.md, .env.example |
| First UI work | DESIGN-SYSTEM.md |
| API endpoint created | Appends to docs/API-CONTRACTS.md |
| Schema created | Appends to docs/DATA-MODELS.md |
| Auth implemented | docs/AUTH-FLOWS.md |
| CI/CD setup | docs/DEPLOYMENT.md, docs/RUNBOOK.md, docs/MONITORING.md |
| /launch command | docs/PRODUCTION-CHECKLIST.md |

---

### Active Hooks

| Hook | What it does |
|------|--------------|
| `session-start.sh` | Shows status, checks prerequisites |
| `pre-tool.sh` | Runs tests before git commit |
| `protect-files.sh` | Blocks .env edits, locks tests during impl |
| `format.sh` | Auto-formats files on save |
| `checkpoint.sh` | Auto-saves on Claude stop |
| `notify.sh` | Desktop notifications |

---

### Iron Laws

These are **non-negotiable**:

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST              │
│                                                                 │
│ 2. NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST              │
│                                                                 │
│ 3. NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE     │
└─────────────────────────────────────────────────────────────────┘
```

---

### Workflow Guidance

```
Skills are here to help, not to block you.

When starting a task:
1. Check if project is initialized (ARCHITECTURE.md exists)
2. Glance at which skills might help
3. Load relevant skill(s)
4. Follow the guidance
5. Skills auto-update docs as you work

If stuck: make progress over perfection.
A working feature beats a perfect process.
```

---

### API Verification

Verify external APIs before implementing. Use:
1. **Researcher agent** - for web documentation
2. **Context7 MCP** (if available) - best option
3. **Official docs** - always reliable
4. **Type definitions** - check signatures
5. **REPL/playground** - test it works

Document verifications in SCRATCHPAD.md.
