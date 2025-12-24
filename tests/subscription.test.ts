import {
  getUserById,
  getCurrentSubscription,
  getSubscriptionPlanId,
} from "@/lib/subscription";

describe("Subscription", () => {
  describe("getUserById", () => {
    it("should return user when found", async () => {
      const user = await getUserById("user-1");
      expect(user).toBeDefined();
      expect(user?.email).toBe("john@example.com");
    });

    it("should return null for unknown user", async () => {
      const user = await getUserById("unknown");
      expect(user).toBeNull();
    });
  });

  describe("getCurrentSubscription", () => {
    it("should return subscription for subscribed user", async () => {
      const subscription = await getCurrentSubscription("user-1");
      expect(subscription).toBeDefined();
      expect(subscription?.planId).toBe("pro");
    });

    it("should return null for user without subscription", async () => {
      const subscription = await getCurrentSubscription("user-2");
      expect(subscription).toBeNull();
    });
  });

  describe("getSubscriptionPlanId", () => {
    it("should return plan ID for subscribed user", async () => {
      const planId = await getSubscriptionPlanId("user-1");
      expect(planId).toBe("pro");
    });

    // This test documents the bug
    it("BUG: returns undefined for user without subscription", async () => {
      const planId = await getSubscriptionPlanId("user-2");
      expect(planId).toBeUndefined(); // This causes "undefined" to show in UI
    });
  });
});
