-- Plans table for subscription pricing
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  interval TEXT NOT NULL CHECK (interval IN ('month', 'year')),
  stripe_price_id TEXT NOT NULL UNIQUE,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX plans_stripe_price_id_idx ON plans(stripe_price_id);
CREATE INDEX plans_is_active_idx ON plans(is_active) WHERE is_active = true;

-- Trigger for updated_at
CREATE TRIGGER update_plans_updated_at
  BEFORE UPDATE ON plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- All users can read active plans
CREATE POLICY "Anyone can read active plans" ON plans
  FOR SELECT USING (is_active = true);
