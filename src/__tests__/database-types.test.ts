import type {
  Plan,
  Subscription,
  Invoice,
  PaymentMethod,
  Database,
} from "../types/database";

describe("Database Types", () => {
  describe("Plan", () => {
    it("should have correct structure", () => {
      const plan: Plan = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Pro Plan",
        description: "Best for growing businesses",
        price_cents: 2900,
        currency: "usd",
        interval: "month",
        stripe_price_id: "price_123abc",
        features: ["Unlimited users", "Priority support"],
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      expect(plan.id).toBeDefined();
      expect(plan.price_cents).toBe(2900);
      expect(plan.interval).toBe("month");
      expect(plan.features).toContain("Unlimited users");
    });
  });

  describe("Subscription", () => {
    it("should have correct structure", () => {
      const subscription: Subscription = {
        id: "123e4567-e89b-12d3-a456-426614174001",
        user_id: "user-uuid",
        plan_id: "plan-uuid",
        stripe_subscription_id: "sub_123",
        stripe_customer_id: "cus_123",
        status: "active",
        current_period_start: "2024-01-01T00:00:00Z",
        current_period_end: "2024-02-01T00:00:00Z",
        cancel_at_period_end: false,
        canceled_at: null,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      expect(subscription.status).toBe("active");
      expect(subscription.cancel_at_period_end).toBe(false);
    });

    it("should support all status types", () => {
      const statuses: Subscription["status"][] = [
        "active",
        "canceled",
        "past_due",
        "trialing",
        "paused",
      ];

      statuses.forEach((status) => {
        expect([
          "active",
          "canceled",
          "past_due",
          "trialing",
          "paused",
        ]).toContain(status);
      });
    });
  });

  describe("Invoice", () => {
    it("should have correct structure", () => {
      const invoice: Invoice = {
        id: "123e4567-e89b-12d3-a456-426614174002",
        user_id: "user-uuid",
        subscription_id: "sub-uuid",
        stripe_invoice_id: "inv_123",
        amount_cents: 2900,
        currency: "usd",
        status: "paid",
        invoice_url: "https://stripe.com/invoice/123",
        invoice_pdf: "https://stripe.com/invoice/123.pdf",
        due_date: "2024-01-15T00:00:00Z",
        paid_at: "2024-01-10T00:00:00Z",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-10T00:00:00Z",
      };

      expect(invoice.status).toBe("paid");
      expect(invoice.amount_cents).toBe(2900);
    });
  });

  describe("PaymentMethod", () => {
    it("should have correct structure for card", () => {
      const paymentMethod: PaymentMethod = {
        id: "123e4567-e89b-12d3-a456-426614174003",
        user_id: "user-uuid",
        stripe_payment_method_id: "pm_123",
        type: "card",
        card_brand: "visa",
        card_last4: "4242",
        card_exp_month: 12,
        card_exp_year: 2025,
        is_default: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      expect(paymentMethod.type).toBe("card");
      expect(paymentMethod.card_last4).toBe("4242");
      expect(paymentMethod.is_default).toBe(true);
    });
  });

  describe("Database", () => {
    it("should have all required tables", () => {
      type Tables = keyof Database["public"]["Tables"];
      const tables: Tables[] = [
        "plans",
        "subscriptions",
        "invoices",
        "payment_methods",
      ];

      expect(tables).toHaveLength(4);
    });
  });
});
