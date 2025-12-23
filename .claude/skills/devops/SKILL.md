---
name: devops
description: CI/CD, deployment, monitoring setup
triggers:
  - CI/CD setup
  - Deployment configuration
  - Production preparation
  - /launch command
generates: docs/DEPLOYMENT.md, docs/RUNBOOK.md, docs/MONITORING.md
---

# DevOps Skill

Ship with confidence.

## When This Skill Activates

- Setting up CI/CD
- Configuring deployment
- Production readiness check
- `/launch` command

## CI/CD Setup

### GitHub Actions (Default)
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

### Deploy on Merge
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      # Platform-specific deploy step
```

## Deployment Platforms

| Platform | Best For | Config File |
|----------|----------|-------------|
| Vercel | Next.js, frontend | vercel.json |
| Railway | Full-stack, databases | railway.toml |
| Fly.io | Containers, global | fly.toml |
| Render | Simple apps | render.yaml |

### Vercel (Next.js)
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### Railway
```toml
# railway.toml
[build]
builder = "nixpacks"

[deploy]
healthcheckPath = "/api/health"
healthcheckTimeout = 30
```

## After Setup

**MUST** create/update these documents:

### docs/DEPLOYMENT.md
Use template from `.claude/templates/DEPLOYMENT.template.md`:
- How to deploy to staging
- How to deploy to production
- Environment variables needed
- Rollback procedure

### docs/RUNBOOK.md
Use template from `.claude/templates/RUNBOOK.template.md`:
- Common incidents and fixes
- Health check endpoints
- Log locations
- Escalation contacts

### docs/MONITORING.md
Use template from `.claude/templates/MONITORING.template.md`:
- What alerts exist
- Dashboard locations
- Key metrics to watch
- On-call procedures

## Health Endpoint

```typescript
// /api/health/route.ts
export async function GET() {
  try {
    // Check database
    await db.$queryRaw`SELECT 1`;
    
    return Response.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return Response.json({ 
      status: 'unhealthy',
      error: 'Database connection failed'
    }, { status: 503 });
  }
}
```

## /launch Command Integration

When invoked via `/launch`, this skill verifies:

1. **Security** (invoke security skill)
   - [ ] No secrets in code
   - [ ] Auth properly configured
   - [ ] Input validation everywhere

2. **Performance**
   - [ ] Bundle size acceptable
   - [ ] Core Web Vitals pass
   - [ ] Database queries optimized

3. **Reliability**
   - [ ] Error tracking configured
   - [ ] Health endpoints exist
   - [ ] Graceful degradation

4. **Operations**
   - [ ] CI/CD working
   - [ ] Monitoring configured
   - [ ] Runbook complete

Generate docs/PRODUCTION-CHECKLIST.md with pass/fail results.

## Exit Criteria

- [ ] CI/CD pipeline working
- [ ] Staging environment configured
- [ ] Production environment configured
- [ ] Health endpoints implemented
- [ ] docs/DEPLOYMENT.md created
- [ ] docs/RUNBOOK.md created
- [ ] docs/MONITORING.md created
