import { PLANS, getPlanById, getPlanName } from "@/lib/plans";

describe("Plans", () => {
  describe("PLANS", () => {
    it("should have free, pro, and enterprise plans", () => {
      expect(PLANS).toHaveLength(3);
      expect(PLANS.map((p) => p.id)).toEqual(["free", "pro", "enterprise"]);
    });
  });

  describe("getPlanById", () => {
    it("should return plan when found", () => {
      const plan = getPlanById("pro");
      expect(plan).toBeDefined();
      expect(plan?.name).toBe("Pro");
    });

    it("should return undefined for unknown plan", () => {
      const plan = getPlanById("unknown");
      expect(plan).toBeUndefined();
    });
  });

  describe("getPlanName", () => {
    it("should return plan name when found", () => {
      expect(getPlanName("pro")).toBe("Pro");
    });

    it("should return Unknown for missing plan", () => {
      expect(getPlanName("unknown")).toBe("Unknown");
    });
  });
});
