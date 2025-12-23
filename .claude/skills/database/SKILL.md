---
name: database
description: Schema design, queries, migrations, Supabase/Postgres
triggers:
  - Database schema design
  - Complex queries
  - Migration creation
  - Supabase setup
generates: docs/DATA-MODELS.md
---

# Database Skill

Design data structures that scale.

## When This Skill Activates

- Creating database schemas
- Writing complex queries
- Planning migrations
- Setting up Supabase/Postgres

## Schema Design Principles

### Every Table Should Have
```sql
CREATE TABLE [name] (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- ... fields ...
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for updated_at
CREATE TRIGGER update_[name]_updated_at
  BEFORE UPDATE ON [name]
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Naming Conventions

- **Tables:** plural, snake_case (users, order_items)
- **Columns:** snake_case (first_name, created_at)
- **Foreign keys:** singular_id (user_id, order_id)
- **Indexes:** table_column_idx (users_email_idx)

### Index Strategy
```sql
-- Always index foreign keys
CREATE INDEX [table]_[fk]_idx ON [table]([fk]);

-- Index columns used in WHERE clauses
CREATE INDEX [table]_[column]_idx ON [table]([column]);

-- Partial indexes for common filters
CREATE INDEX posts_published_idx ON posts(published_at) 
  WHERE published = true;

-- Composite indexes for common queries
CREATE INDEX orders_user_status_idx ON orders(user_id, status);
```

## After Creating/Modifying Schema

**MUST** append to docs/DATA-MODELS.md:

```markdown
## [table_name]

[Description]

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Primary key |
| user_id | UUID | FK, NOT NULL | References users |
| name | TEXT | NOT NULL | Display name |
| created_at | TIMESTAMPTZ | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMPTZ | NOT NULL | Last update |

**Relationships:**
- belongs_to: users via user_id
- has_many: order_items

**Indexes:**
- table_user_id_idx: user_id (FK index)
- table_name_idx: name (search)
```

## Supabase Patterns

### Row Level Security
```sql
-- Always enable RLS
ALTER TABLE [table] ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users see own data" ON [table]
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own data
CREATE POLICY "Users insert own data" ON [table]
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own data
CREATE POLICY "Users update own data" ON [table]
  FOR UPDATE USING (auth.uid() = user_id);
```

### Migrations
- One change per migration
- Always test rollback
- Never modify deployed migrations
- Use descriptive names: `20240101_add_users_email_index`

## Query Patterns

### Avoid N+1
```typescript
// ❌ N+1 problem
const orders = await db.orders.findMany();
for (const order of orders) {
  order.items = await db.orderItems.findMany({ where: { orderId: order.id } });
}

// ✅ Use includes/joins
const orders = await db.orders.findMany({
  include: { items: true }
});
```

### Pagination
```typescript
const { data, count } = await db.items
  .select('*', { count: 'exact' })
  .range(offset, offset + limit - 1);

return { data, meta: { page, total: count } };
```

## Exit Criteria

- [ ] Schema follows naming conventions
- [ ] Indexes on foreign keys and query columns
- [ ] RLS enabled (if Supabase)
- [ ] Documented in DATA-MODELS.md
- [ ] Migration created
- [ ] No N+1 queries
