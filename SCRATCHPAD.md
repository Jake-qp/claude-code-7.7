# Scratchpad

## Session Continuity

This file tracks the current session state, API verifications, and investigation notes.

## Current Status

- Project: Billing Dashboard
- Phase: Part 2 Testing
- Last Updated: 2024-12-23

## API Verifications

### Plausible Analytics (via Researcher Agent + WebSearch/WebFetch)

**Verified:** 2024-12-23
**Documentation:** https://plausible.io/docs

| Method             | Status      | Notes                                                                      |
| ------------------ | ----------- | -------------------------------------------------------------------------- |
| JavaScript Snippet | ✅ Verified | `<script defer data-domain="..." src="https://plausible.io/js/script.js">` |
| Events API         | ✅ Verified | `POST https://plausible.io/api/event`                                      |
| Custom Events (JS) | ✅ Verified | `plausible('EventName', {props: {...}})`                                   |
| NPM Package        | ✅ Verified | `plausible-tracker` with TypeScript types                                  |

**Integration Notes:**

- No API key required for Events API (domain validation is security)
- Script is <1KB, async, no cookies, GDPR compliant
- Custom events count toward billing limit
- Max 30 custom properties per event (scalar values only)

**Rate Limits:**

- Events API: Not explicitly documented
- Stats API: 60 req/min per API key

**Recommendations:**

- Use JavaScript snippet for page views (simplest)
- Use `plausible()` function for custom events
- Consider `plausible-tracker` NPM package for TypeScript

## Investigation Notes

(To be documented during debugging)

## Implementation Plans

### Usage Analytics Feature

**Scope:** Dashboard card showing API calls, storage, team members with progress bars
**Designed:** UsageMetrics.tsx with all states (Loading, Empty, Error, Success)
**Started:** 2024-12-23

```
Task 1 → Task 2 → Task 5
             ↓
Task 3 → Task 4 → Task 5
```

---

### Task 1: Create usage metrics API types (~5 min)

**Files:** src/types/billing.ts, src/lib/usage.ts
**Do:** Add UsageMetricsResponse type and mock fetch function
**Verify:** Types compile without errors
**Depends on:** Nothing

---

### Task 2: Write tests for usage metrics hook (~10 min)

**Files:** tests/use-usage-metrics.test.ts
**Do:** Test useUsageMetrics hook returns loading, error, success states
**Verify:** Tests fail (hook not implemented yet)
**Depends on:** Task 1

---

### Task 3: Implement useUsageMetrics hook (~10 min)

**Files:** src/hooks/useUsageMetrics.ts
**Do:** Create hook that fetches usage data with loading/error states
**Verify:** Task 2 tests pass
**Depends on:** Task 2

---

### Task 4: Connect UsageMetrics component to hook (~10 min)

**Files:** src/components/UsageMetrics.tsx
**Do:** Replace mock data with useUsageMetrics hook
**Verify:** Component fetches real data (mock API)
**Depends on:** Task 3

---

### Task 5: Integrate into Dashboard (~5 min)

**Files:** src/components/Dashboard.tsx
**Do:** Add UsageMetricsCard to dashboard layout
**Verify:** Card appears on dashboard with live data
**Depends on:** Task 4

---

### Task 6: Add Plausible event tracking (~10 min)

**Files:** src/lib/analytics.ts, src/components/Dashboard.tsx
**Do:** Track "View Usage Metrics" event when card loads
**Verify:** Event appears in browser console (dev mode)
**Depends on:** Task 5

---

**Total estimated time:** ~50 min (6 tasks)
**Critical path:** Task 1 → 2 → 3 → 4 → 5 → 6
