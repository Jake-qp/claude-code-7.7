"use client";

import React from "react";
import { UsageMetrics as UsageMetricsType } from "@/types/billing";

// =============================================================================
// MOCK DATA - Will be replaced with real API later
// =============================================================================
const mockUsageMetrics: UsageMetricsType = {
  apiCalls: 7543,
  storageUsed: 12.5,
  teamMembers: 4,
  lastUpdated: new Date("2024-12-23T10:30:00Z"),
};

const mockPlanLimits = {
  apiCalls: 10000,
  storageUsed: 50,
  teamMembers: 5,
};

// =============================================================================
// TYPES
// =============================================================================
interface UsageMetricsProps {
  metrics: UsageMetricsType | null;
  planLimits: typeof mockPlanLimits;
  isLoading?: boolean;
  error?: string | null;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function MetricCard({
  label,
  value,
  limit,
  unit,
}: {
  label: string;
  value: number;
  limit: number;
  unit: string;
}) {
  const percentage = Math.round((value / limit) * 100);
  const isNearLimit = percentage >= 80;
  const isOverLimit = percentage >= 100;

  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">
        <span
          className={
            isOverLimit ? "text-red" : isNearLimit ? "text-yellow" : ""
          }
        >
          {value.toLocaleString()}
        </span>
        <span className="metric-limit">
          / {limit.toLocaleString()} {unit}
        </span>
      </div>
      <div className="metric-bar">
        <div
          className={`metric-bar-fill ${isOverLimit ? "bg-red" : isNearLimit ? "bg-yellow" : "bg-green"}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

// =============================================================================
// LOADING STATE
// =============================================================================
function LoadingSkeleton() {
  return (
    <div
      className="usage-metrics usage-metrics--loading"
      aria-busy="true"
      aria-label="Loading usage metrics"
    >
      <h3 className="usage-metrics__title">Usage This Month</h3>
      <div className="metrics-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="metric-card metric-card--skeleton">
            <div className="skeleton skeleton--label" />
            <div className="skeleton skeleton--value" />
            <div className="skeleton skeleton--bar" />
          </div>
        ))}
      </div>
      <div className="skeleton skeleton--timestamp" />
    </div>
  );
}

// =============================================================================
// EMPTY STATE
// =============================================================================
function EmptyState() {
  return (
    <div className="usage-metrics usage-metrics--empty">
      <h3 className="usage-metrics__title">Usage This Month</h3>
      <div className="empty-state">
        <div className="empty-state__icon" aria-hidden="true">
          📊
        </div>
        <p className="empty-state__message">No usage data yet</p>
        <p className="empty-state__hint">
          Start using the API to see your metrics here.
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// ERROR STATE
// =============================================================================
function ErrorState({ message }: { message: string }) {
  return (
    <div className="usage-metrics usage-metrics--error" role="alert">
      <h3 className="usage-metrics__title">Usage This Month</h3>
      <div className="error-state">
        <div className="error-state__icon" aria-hidden="true">
          ⚠️
        </div>
        <p className="error-state__message">Unable to load usage data</p>
        <p className="error-state__details">{message}</p>
        <button
          className="error-state__retry"
          onClick={() => window.location.reload()}
          aria-label="Retry loading usage data"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// SUCCESS STATE (Main Component)
// =============================================================================
function SuccessState({
  metrics,
  planLimits,
}: {
  metrics: UsageMetricsType;
  planLimits: typeof mockPlanLimits;
}) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="usage-metrics usage-metrics--success">
      <h3 className="usage-metrics__title">Usage This Month</h3>
      <div className="metrics-grid">
        <MetricCard
          label="API Calls"
          value={metrics.apiCalls}
          limit={planLimits.apiCalls}
          unit="calls"
        />
        <MetricCard
          label="Storage"
          value={metrics.storageUsed}
          limit={planLimits.storageUsed}
          unit="GB"
        />
        <MetricCard
          label="Team Members"
          value={metrics.teamMembers}
          limit={planLimits.teamMembers}
          unit="seats"
        />
      </div>
      <div className="usage-metrics__footer">
        <span className="last-updated">
          Last updated: {formatDate(metrics.lastUpdated)}
        </span>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT - Handles all states
// =============================================================================
export function UsageMetricsCard({
  metrics,
  planLimits,
  isLoading = false,
  error = null,
}: UsageMetricsProps) {
  // State priority: Loading > Error > Empty > Success
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (
    !metrics ||
    (metrics.apiCalls === 0 &&
      metrics.storageUsed === 0 &&
      metrics.teamMembers === 0)
  ) {
    return <EmptyState />;
  }

  return <SuccessState metrics={metrics} planLimits={planLimits} />;
}

// =============================================================================
// DEMO COMPONENT - For testing all states
// =============================================================================
export function UsageMetricsDemo() {
  const [state, setState] = React.useState<
    "loading" | "error" | "empty" | "success"
  >("success");

  return (
    <div className="demo-container">
      <div className="demo-controls">
        <button onClick={() => setState("loading")}>Loading</button>
        <button onClick={() => setState("error")}>Error</button>
        <button onClick={() => setState("empty")}>Empty</button>
        <button onClick={() => setState("success")}>Success</button>
      </div>

      <UsageMetricsCard
        metrics={state === "empty" ? null : mockUsageMetrics}
        planLimits={mockPlanLimits}
        isLoading={state === "loading"}
        error={
          state === "error" ? "Network error: Unable to fetch metrics" : null
        }
      />
    </div>
  );
}
