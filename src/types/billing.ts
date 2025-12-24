export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: "monthly" | "yearly";
  features: string[];
}

export interface Subscription {
  id: string;
  planId: string;
  status: "active" | "canceled" | "past_due" | "trialing";
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscription?: Subscription;
}

export interface UsageMetrics {
  apiCalls: number;
  storageUsed: number;
  teamMembers: number;
  lastUpdated: Date;
}
