---
description: Production readiness checklist. Usage: /launch
---

# /launch - Production Readiness Check

Verify your app is ready for production deployment.

---

## What This Does

The `/launch` command runs a comprehensive checklist covering:
1. **Security** - No vulnerabilities, auth working
2. **Performance** - Fast enough for users
3. **Reliability** - Error handling, monitoring
4. **Operations** - CI/CD, deployment, runbook
5. **Documentation** - Complete and accurate

---

## Before Starting

```bash
# Ensure we're on a clean state
git status
npm test
npm run build
```

If tests or build fail, fix those first.

---

## Phase 1: Security Check

Load skill: `.claude/skills/security.md`

### Automated Checks

```bash
# Check for secrets in code
grep -rn "sk_live\|pk_live\|password\s*=\|api_key\s*=" --include="*.ts" --include="*.tsx" --include="*.js"

# Check .env not committed
git ls-files | grep -E "^\.env$"

# Check for console.log with sensitive data
grep -rn "console.log.*password\|console.log.*token" --include="*.ts"
```

### Manual Verification

- [ ] Auth flows tested end-to-end
- [ ] Rate limiting enabled on sensitive endpoints
- [ ] Input validation on all user inputs
- [ ] HTTPS enforced (check deployment config)

Record results in `.launch-check`.

---

## Phase 2: Performance Check

Load skill: `.claude/skills/performance.md`

### Automated Checks

```bash
# Bundle size
npm run build
# Note output size

# Run Lighthouse (if available)
npx lighthouse http://localhost:3000 --output=json --quiet
```

### Manual Verification

- [ ] Core Web Vitals targets met (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] No N+1 database queries
- [ ] Images optimized
- [ ] Caching configured

Record results in `.launch-check`.

---

## Phase 3: Reliability Check

### Error Tracking

```bash
# Check for error tracking setup
grep -rn "Sentry\|LogRocket\|Bugsnag" --include="*.ts" --include="*.tsx"
```

### Manual Verification

- [ ] Error tracking configured and sending
- [ ] Health endpoint exists: `GET /api/health`
- [ ] Graceful error handling (no stack traces to users)
- [ ] Database backups configured (check Supabase/platform)

---

## Phase 4: Operations Check

Load skill: `.claude/skills/devops.md`

### CI/CD

```bash
# Check GitHub Actions
ls -la .github/workflows/
```

- [ ] CI pipeline runs on push/PR
- [ ] Tests run automatically
- [ ] Deploy pipeline configured

### Documentation

- [ ] docs/DEPLOYMENT.md exists and accurate
- [ ] docs/RUNBOOK.md exists with common incidents
- [ ] docs/MONITORING.md exists with alerts defined

---

## Phase 5: Documentation Check

Load skill: `.claude/skills/documentation.md`

### Required Documents

| Document | Location | Status |
|----------|----------|--------|
| Architecture | ARCHITECTURE.md | ✅/❌ |
| API Contracts | docs/API-CONTRACTS.md | ✅/❌ |
| Data Models | docs/DATA-MODELS.md | ✅/❌ |
| Auth Flows | docs/AUTH-FLOWS.md | ✅/❌ |
| Deployment | docs/DEPLOYMENT.md | ✅/❌ |
| Runbook | docs/RUNBOOK.md | ✅/❌ |
| README | README.md | ✅/❌ |

---

## Phase 6: Generate Report

Create `docs/PRODUCTION-CHECKLIST.md` using template from `.claude/templates/PRODUCTION-CHECKLIST.template.md`.

Fill in:
- All check results (✅/❌)
- Blocking issues
- Recommendations
- Launch status

---

## Output

```markdown
## /launch Results

### Summary
| Category | Passed | Failed | Warnings |
|----------|--------|--------|----------|
| Security | X | Y | Z |
| Performance | X | Y | Z |
| Reliability | X | Y | Z |
| Operations | X | Y | Z |
| Documentation | X | Y | Z |

### Blocking Issues
[List any critical failures that must be fixed]

### Warnings (Non-Blocking)
[List items that should be addressed but don't block launch]

### Recommendations
[Suggestions for improvement]

---

**Launch Status:** ✅ READY / ⚠️ READY WITH WARNINGS / ⛔ NOT READY

**Report saved to:** docs/PRODUCTION-CHECKLIST.md
```

---

## If Not Ready

If launch check fails:

1. Review blocking issues
2. Create tasks in `.tasks`:
   ```
   [ ] [LAUNCH] Fix: [blocking issue 1]
   [ ] [LAUNCH] Fix: [blocking issue 2]
   ```
3. Run `/build` or `/fix` for each
4. Re-run `/launch` when complete

---

## Launch Approved

If all checks pass:

```
✅ Your app is ready for production!

Recommended next steps:
1. Final manual QA pass
2. Deploy to staging for final verification
3. Deploy to production
4. Monitor error tracking for first 24 hours
```
