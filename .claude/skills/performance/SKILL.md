---
name: performance
description: Optimization, Core Web Vitals, bundle analysis
triggers:
  - Performance optimization request
  - Core Web Vitals issues
  - Bundle size concerns
  - Slow page/API response
generates: null
---

# Performance Skill

Make apps fast for real users.

## When This Skill Activates

- Optimizing slow pages
- Analyzing bundle size
- Improving Core Web Vitals
- Database query optimization

## Core Web Vitals Targets

| Metric | Good | Needs Work | Poor |
|--------|------|------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5-4s | > 4s |
| FID (First Input Delay) | < 100ms | 100-300ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1-0.25 | > 0.25 |
| TTFB (Time to First Byte) | < 600ms | 600-1800ms | > 1800ms |

## Bundle Size Analysis

```bash
# Next.js
npx @next/bundle-analyzer

# General
npx source-map-explorer dist/**/*.js
```

### Size Targets

| Chunk | Target |
|-------|--------|
| Initial JS | < 100KB gzipped |
| Per-route | < 50KB gzipped |
| Total CSS | < 50KB gzipped |

## Optimization Patterns

### Code Splitting
```typescript
// Route-based splitting (automatic in Next.js)
// Component-based splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Skeleton />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Image Optimization
```typescript
// Next.js Image
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Above the fold
  placeholder="blur"
/>
```

### Caching Strategies

| Resource | Strategy |
|----------|----------|
| Static assets | `max-age=31536000, immutable` |
| API responses | `s-maxage=60, stale-while-revalidate` |
| HTML pages | `no-cache` or ISR |
| User data | No cache |

## Database Performance

### Query Optimization
```sql
-- Add EXPLAIN ANALYZE to understand query
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = '...';

-- Common fixes:
-- 1. Add missing index
CREATE INDEX orders_user_id_idx ON orders(user_id);

-- 2. Limit results
SELECT * FROM orders LIMIT 50;

-- 3. Select only needed columns
SELECT id, status, created_at FROM orders;
```

### N+1 Detection
```typescript
// Enable query logging in development
// Watch for repeated similar queries

// ❌ N+1
for (const user of users) {
  const orders = await db.orders.findMany({ where: { userId: user.id } });
}

// ✅ Batch
const orders = await db.orders.findMany({
  where: { userId: { in: users.map(u => u.id) } }
});
```

## Monitoring Performance

```typescript
// Web Vitals reporting
import { onCLS, onFID, onLCP } from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onLCP(console.log);
```

## Quick Wins Checklist

- [ ] Enable gzip/brotli compression
- [ ] Use CDN for static assets
- [ ] Lazy load below-the-fold images
- [ ] Remove unused CSS/JS
- [ ] Add resource hints (preconnect, prefetch)
- [ ] Use font-display: swap
- [ ] Defer non-critical scripts

## Measurement Before/After

Always measure:
1. **Before:** Lighthouse score, Core Web Vitals, bundle size
2. **Make change**
3. **After:** Same metrics
4. **Document:** What changed and by how much

## Exit Criteria

- [ ] Core Web Vitals in "Good" range
- [ ] Bundle size within targets
- [ ] No N+1 queries
- [ ] Caching configured
- [ ] Before/after measurements documented
