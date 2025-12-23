export type Plan = {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  currency: string;
  interval: "month" | "year";
  stripe_price_id: string;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  plan_id: string;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  status: "active" | "canceled" | "past_due" | "trialing" | "paused";
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Invoice = {
  id: string;
  user_id: string;
  subscription_id: string;
  stripe_invoice_id: string;
  amount_cents: number;
  currency: string;
  status: "draft" | "open" | "paid" | "void" | "uncollectible";
  invoice_url: string | null;
  invoice_pdf: string | null;
  due_date: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PaymentMethod = {
  id: string;
  user_id: string;
  stripe_payment_method_id: string;
  type: "card" | "bank_account";
  card_brand: string | null;
  card_last4: string | null;
  card_exp_month: number | null;
  card_exp_year: number | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      plans: {
        Row: Plan;
        Insert: Omit<Plan, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Plan, "id" | "created_at" | "updated_at">>;
      };
      subscriptions: {
        Row: Subscription;
        Insert: Omit<Subscription, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Subscription, "id" | "created_at" | "updated_at">>;
      };
      invoices: {
        Row: Invoice;
        Insert: Omit<Invoice, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Invoice, "id" | "created_at" | "updated_at">>;
      };
      payment_methods: {
        Row: PaymentMethod;
        Insert: Omit<PaymentMethod, "id" | "created_at" | "updated_at">;
        Update: Partial<
          Omit<PaymentMethod, "id" | "created_at" | "updated_at">
        >;
      };
    };
  };
};
