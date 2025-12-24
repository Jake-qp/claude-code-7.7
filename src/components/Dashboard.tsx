"use client";

import React, { useState } from "react";
import { BillingOverview } from "./BillingOverview";
import { UpgradePage } from "./UpgradePage";
import { Subscription } from "@/types/billing";

interface DashboardProps {
  userId: string;
  subscription: Subscription | null;
}

export function Dashboard({ userId, subscription }: DashboardProps) {
  const [showUpgrade, setShowUpgrade] = useState(false);

  if (showUpgrade) {
    return <UpgradePage userId={userId} />;
  }

  return (
    <div className="dashboard">
      <h1>Billing Dashboard</h1>
      <BillingOverview
        subscription={subscription}
        onUpgrade={() => setShowUpgrade(true)}
      />
    </div>
  );
}
