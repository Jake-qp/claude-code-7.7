-- Payment methods table for stored payment methods
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_payment_method_id TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('card', 'bank_account')),
  card_brand TEXT,
  card_last4 TEXT,
  card_exp_month INTEGER,
  card_exp_year INTEGER,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX payment_methods_user_id_idx ON payment_methods(user_id);
CREATE INDEX payment_methods_stripe_payment_method_id_idx ON payment_methods(stripe_payment_method_id);
CREATE INDEX payment_methods_is_default_idx ON payment_methods(user_id, is_default) WHERE is_default = true;

-- Trigger for updated_at
CREATE TRIGGER update_payment_methods_updated_at
  BEFORE UPDATE ON payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- Users can only see their own payment methods
CREATE POLICY "Users can view own payment methods" ON payment_methods
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own payment methods
CREATE POLICY "Users can insert own payment methods" ON payment_methods
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own payment methods
CREATE POLICY "Users can update own payment methods" ON payment_methods
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own payment methods
CREATE POLICY "Users can delete own payment methods" ON payment_methods
  FOR DELETE USING (auth.uid() = user_id);
