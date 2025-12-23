---
name: backend
description: APIs, authentication, business logic, server-side
triggers:
  - API endpoint creation
  - Authentication/authorization
  - Business logic implementation
  - Server-side validation
generates: docs/API-CONTRACTS.md
---

# Backend Skill

Build robust, secure server-side systems.

## When This Skill Activates

- Creating API endpoints
- Implementing authentication
- Writing business logic
- Server-side data validation

## API Design Principles

### URL Patterns
```
GET    /api/v1/[resource]           → List
POST   /api/v1/[resource]           → Create
GET    /api/v1/[resource]/[id]      → Get one
PUT    /api/v1/[resource]/[id]      → Update (full)
PATCH  /api/v1/[resource]/[id]      → Update (partial)
DELETE /api/v1/[resource]/[id]      → Delete
GET    /api/v1/[resource]/[id]/[sub]→ Nested resource
```

### Response Format
```typescript
// Success
{ data: T, meta?: { page, total } }

// Error
{ 
  error: string,
  code: 'VALIDATION_ERROR' | 'NOT_FOUND' | 'UNAUTHORIZED',
  details?: { field: string, message: string }[]
}
```

### Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET/PUT/PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation failed |
| 401 | Unauthorized | Not logged in |
| 403 | Forbidden | Logged in but not allowed |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Rate limited |
| 500 | Server Error | Unexpected error |

## Endpoint Implementation Pattern

```typescript
// Next.js App Router
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const item = await db.items.findUnique({ where: { id: params.id } });
    if (!item) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    
    return Response.json({ data: item });
  } catch (error) {
    console.error('GET /api/items/[id]:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
```

## After Creating Endpoint

**MUST** append to docs/API-CONTRACTS.md:

```markdown
## [METHOD] /api/v1/[path]

[Description]

**Authentication:** Required / Public

**Request:**
\`\`\`json
{ "field": "type" }
\`\`\`

**Response:** [status code]
\`\`\`json
{ "data": { } }
\`\`\`

**Errors:**
- 400: [when]
- 401: [when]
- 404: [when]
```

## Authentication Patterns

| Provider | When to Use |
|----------|-------------|
| NextAuth.js | Next.js apps, social logins |
| Clerk | Drop-in auth, fast setup |
| Supabase Auth | Already using Supabase |
| Custom JWT | Full control needed |

When implementing auth, also update docs/AUTH-FLOWS.md.

## Input Validation

Always validate with Zod:

```typescript
import { z } from 'zod';

const CreateItemSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
});

// In endpoint
const body = await request.json();
const result = CreateItemSchema.safeParse(body);
if (!result.success) {
  return Response.json({
    error: 'Validation failed',
    code: 'VALIDATION_ERROR',
    details: result.error.issues,
  }, { status: 400 });
}
```

## Exit Criteria

- [ ] Endpoint follows REST conventions
- [ ] Input validation with Zod
- [ ] Proper error handling
- [ ] Auth check if protected
- [ ] Documented in API-CONTRACTS.md
- [ ] Tests written
