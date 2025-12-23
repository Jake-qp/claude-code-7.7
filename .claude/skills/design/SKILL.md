---
name: Design
description: Validate UX before implementation with mockups and contracts
trigger: DESIGN phase after spec is complete
token_estimate: ~80 tokens metadata, ~400 full
---

# Design Skill

Build the experience before the code.

## Choose Your Path

**Building UI?** → UI Design Flow
**Building API?** → API Contract Flow
**Both?** → Do UI first, then API

---

## UI Design Flow

### Step 1: Create Components with Mock Data

Build the UI using hardcoded/mock data:

```typescript
// Mock data - will be replaced with real API later
const mockUser = { name: 'Jane', orders: [...] };

function Dashboard() {
  return <OrderList orders={mockUser.orders} />;
}
```

### Step 2: Build All States

Every component needs:

| State | What to show |
|-------|--------------|
| Loading | Skeleton or spinner |
| Empty | Helpful guidance ("No orders yet") |
| Error | What went wrong + how to fix |
| Success | The actual content |

### Step 3: Self-Verification Checklist

Before proceeding, verify:

- [ ] **Hierarchy** — Most important thing is most prominent?
- [ ] **Obvious** — Primary action stands out?
- [ ] **Feedback** — Every interaction has response?
- [ ] **Flow** — User knows what to do next?
- [ ] **Empty** — Empty states guide to action?
- [ ] **Error** — Errors explain AND suggest fix?
- [ ] **Loading** — Loading states prevent confusion?
- [ ] **Mobile** — Touch targets 44px+?
- [ ] **Accessible** — Labels, contrast, keyboard nav?

**All boxes must be checked before BUILD.**

### Step 4: Commit Design

```bash
git add .
git commit -m "design: [feature] UI with mocks"
```

---

## API Contract Flow

### Step 1: Define TypeScript Interfaces

```typescript
// types/api.ts
interface CreateOrderRequest {
  customerId: string;
  items: OrderItem[];
}

interface CreateOrderResponse {
  orderId: string;
  status: 'pending' | 'confirmed';
  createdAt: string;
}
```

### Step 2: Define Endpoints

```markdown
## API Endpoints

### POST /api/orders
- Request: CreateOrderRequest
- Response: CreateOrderResponse
- Errors: 400 (invalid), 401 (unauthorized), 500 (server)

### GET /api/orders/:id
- Response: Order
- Errors: 404 (not found)
```

### Step 3: Commit Contract

```bash
git add .
git commit -m "design: [feature] API contract"
```

---

## Exit Criteria

- [ ] UI mocks OR API contracts created
- [ ] All states handled (loading, empty, error, success)
- [ ] Self-verification checklist passed
- [ ] Design committed

```bash
echo "design" > .claude/state/phase
```
