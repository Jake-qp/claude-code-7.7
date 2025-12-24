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

(To be documented during Test 4)
