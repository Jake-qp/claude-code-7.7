import { Subscription, User } from "@/types/billing";

// Simulated user data - in production this would come from a database
const mockUsers: Record<string, User> = {
  "user-1": {
    id: "user-1",
    email: "john@example.com",
    name: "John Doe",
    subscription: {
      id: "sub-1",
      planId: "pro",
      status: "active",
      currentPeriodEnd: new Date("2024-12-31"),
      cancelAtPeriodEnd: false,
    },
  },
  "user-2": {
    id: "user-2",
    email: "jane@example.com",
    name: "Jane Smith",
    // Note: No subscription - will cause issues if not handled
  },
};

export async function getUserById(userId: string): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockUsers[userId] || null;
}

export async function getCurrentSubscription(
  userId: string,
): Promise<Subscription | null> {
  const user = await getUserById(userId);
  return user?.subscription || null;
}

export async function getSubscriptionPlanId(
  userId: string,
): Promise<string | undefined> {
  const subscription = await getCurrentSubscription(userId);
  // BUG: This returns undefined when subscription is null
  // Should return a default plan or handle gracefully
  return subscription?.planId;
}
