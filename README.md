# Billing Dashboard

> A SaaS billing dashboard built with Next.js, Stripe, and React Native companion app.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/example/billing-dashboard.git
cd billing-dashboard

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Open http://localhost:3000
```

## Tech Stack

| Layer         | Technology              |
| ------------- | ----------------------- |
| **Framework** | Next.js 14 (App Router) |
| **Language**  | TypeScript              |
| **Styling**   | Tailwind CSS            |
| **Payments**  | Stripe                  |
| **Analytics** | Plausible               |
| **Testing**   | Jest + Playwright       |
| **Mobile**    | React Native + Expo     |

## Project Structure

```
billing-dashboard/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   │   ├── BillingOverview.tsx
│   │   ├── Dashboard.tsx
│   │   ├── UpgradePage.tsx
│   │   └── UsageMetrics.tsx
│   ├── lib/           # Utilities
│   │   ├── plans.ts   # Plan data and helpers
│   │   └── subscription.ts
│   ├── hooks/         # Custom React hooks
│   └── types/         # TypeScript types
├── tests/             # Jest unit tests
├── e2e/               # Playwright E2E tests
├── mobile/            # React Native companion app
├── docs/              # Documentation
│   ├── DEPLOYMENT.md
│   ├── RUNBOOK.md
│   └── MONITORING.md
└── .github/workflows/ # CI/CD
```

## Environment Variables

| Variable                 | Required | Description                   |
| ------------------------ | -------- | ----------------------------- |
| `DATABASE_URL`           | Yes      | PostgreSQL connection string  |
| `NEXTAUTH_SECRET`        | Yes      | Auth encryption key           |
| `NEXTAUTH_URL`           | Yes      | App base URL                  |
| `STRIPE_SECRET_KEY`      | Yes      | Stripe secret key             |
| `STRIPE_PUBLISHABLE_KEY` | Yes      | Stripe publishable key        |
| `STRIPE_WEBHOOK_SECRET`  | Yes      | Stripe webhook signing secret |
| `PLAUSIBLE_DOMAIN`       | No       | Plausible analytics domain    |

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run unit tests
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Run Playwright with UI
```

## Features

### Billing Dashboard

- View current subscription plan
- Display usage metrics (API calls, storage, team members)
- Upgrade/downgrade plans
- Access Stripe Customer Portal

### Usage Analytics

- Real-time usage tracking
- Progress bars with limit warnings
- Color-coded status (green/yellow/red)

### Mobile App

- React Native companion app
- View plan details on the go
- Same features as web dashboard

## Testing

### Unit Tests (Jest)

```bash
npm test
```

### E2E Tests (Playwright)

```bash
npm run test:e2e
```

### Test Coverage Targets

- Unit tests: 80%+ coverage
- E2E tests: Critical user journeys

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for complete deployment guide.

Quick deploy to Vercel:

```bash
vercel --prod
```

## Documentation

| Document                             | Description           |
| ------------------------------------ | --------------------- |
| [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) | Component library     |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md)  | Deployment procedures |
| [RUNBOOK.md](docs/RUNBOOK.md)        | Incident response     |
| [MONITORING.md](docs/MONITORING.md)  | Metrics and alerts    |

## Contributing

1. Create a feature branch
2. Write tests first (TDD)
3. Submit PR for review
4. CI must pass before merge

## License

MIT

---

_Built with Claude Code V7.7_
