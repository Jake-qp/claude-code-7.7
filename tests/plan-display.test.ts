import {
  getPlanById,
  getPlanName,
  getDisplayPlanName,
  getPlanOrDefault,
} from "@/lib/plans";

describe("Plan Display Bug Fix", () => {
  describe("getDisplayPlanName", () => {
    it("should return Free for undefined planId", () => {
      expect(getDisplayPlanName(undefined)).toBe("Free");
    });

    it("should return Free for null planId", () => {
      expect(getDisplayPlanName(null)).toBe("Free");
    });

    it("should return plan name for valid planId", () => {
      expect(getDisplayPlanName("pro")).toBe("Pro");
      expect(getDisplayPlanName("enterprise")).toBe("Enterprise");
    });

    it("should return Free for unknown planId", () => {
      expect(getDisplayPlanName("unknown")).toBe("Free");
    });
  });

  describe("getPlanOrDefault", () => {
    it("should return Free plan for undefined planId", () => {
      const plan = getPlanOrDefault(undefined);
      expect(plan.id).toBe("free");
      expect(plan.name).toBe("Free");
    });

    it("should return Free plan for null planId", () => {
      const plan = getPlanOrDefault(null);
      expect(plan.id).toBe("free");
      expect(plan.name).toBe("Free");
    });

    it("should return correct plan for valid planId", () => {
      const plan = getPlanOrDefault("pro");
      expect(plan.id).toBe("pro");
      expect(plan.name).toBe("Pro");
    });

    it("should return Free plan for unknown planId", () => {
      const plan = getPlanOrDefault("unknown");
      expect(plan.id).toBe("free");
    });
  });
});
