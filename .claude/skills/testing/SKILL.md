---
name: testing
description: Jest, Playwright, E2E setup, testing strategies
triggers:
  - Test infrastructure setup
  - E2E test creation
  - Testing strategy decisions
  - CI test configuration
generates: docs/TESTING-STRATEGY.md (optional)
---

# Testing Skill

Build confidence through comprehensive testing.

## When This Skill Activates

- Setting up test infrastructure
- Writing E2E tests
- Configuring CI testing
- Testing strategy decisions

## Testing Pyramid

```
        /\
       /  \      E2E (Playwright)
      /    \     - User journeys
     /------\    - Critical paths
    /        \   
   /  Integ   \  Integration
  /            \ - API routes
 /--------------\- Components with data
/                \
/      Unit       \ Unit (Jest/Vitest)
/                  \- Functions
/--------------------\- Utilities
```

## Test Setup

### Jest/Vitest Configuration
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'test/'],
    },
  },
});
```

### Playwright Configuration
```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

## Unit Test Patterns

### Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### API Route Testing
```typescript
import { GET, POST } from './route';

describe('GET /api/items', () => {
  it('returns items for authenticated user', async () => {
    const request = new Request('http://localhost/api/items');
    const response = await GET(request);
    
    expect(response.status).toBe(200);
    const { data } = await response.json();
    expect(data).toBeInstanceOf(Array);
  });
});
```

## E2E Test Patterns

### User Journey Test
```typescript
import { test, expect } from '@playwright/test';

test('user can complete checkout', async ({ page }) => {
  await page.goto('/');
  
  // Add item to cart
  await page.click('[data-testid="add-to-cart"]');
  await expect(page.locator('.cart-count')).toHaveText('1');
  
  // Checkout
  await page.click('[data-testid="checkout"]');
  await page.fill('[name="email"]', 'test@example.com');
  await page.click('[data-testid="submit"]');
  
  // Verify success
  await expect(page).toHaveURL(/\/success/);
});
```

## Test Data Strategies

| Strategy | When | Example |
|----------|------|---------|
| Factories | Consistent test data | `createUser({ name: 'Test' })` |
| Fixtures | Static reference data | `fixtures/products.json` |
| Seeds | Database state | `beforeEach: resetDb()` |
| Mocks | External services | `vi.mock('./stripe')` |

## CI Configuration

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test -- --coverage

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e
```

## Coverage Targets

| Type | Target |
|------|--------|
| Unit | 80%+ |
| Integration | Key paths |
| E2E | Critical journeys |

## Exit Criteria

- [ ] Test framework configured
- [ ] Unit tests for business logic
- [ ] Integration tests for API routes
- [ ] E2E tests for critical paths
- [ ] CI pipeline runs tests
- [ ] Coverage meets targets
