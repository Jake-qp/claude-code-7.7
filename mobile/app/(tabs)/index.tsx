import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Dashboard Home Screen
 * Shows overview of current plan and usage
 */
export default function DashboardScreen() {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome back!</Text>
          <Text style={styles.welcomeSubtitle}>
            Here&apos;s your account overview
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Plan</Text>
          <CurrentPlanCard />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage This Month</Text>
          <UsageCard label="API Calls" value={7543} limit={10000} />
          <UsageCard label="Storage" value={12.5} limit={50} unit="GB" />
          <UsageCard label="Team Members" value={4} limit={5} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CurrentPlanCard() {
  return (
    <View style={styles.planCard}>
      <View style={styles.planHeader}>
        <Text style={styles.planName}>Pro</Text>
        <Text style={styles.planPrice}>$29/month</Text>
      </View>
      <Text style={styles.planStatus}>Active</Text>
    </View>
  );
}

interface UsageCardProps {
  label: string;
  value: number;
  limit: number;
  unit?: string;
}

function UsageCard({ label, value, limit, unit = "" }: UsageCardProps) {
  const percentage = Math.round((value / limit) * 100);
  const isNearLimit = percentage >= 80;

  return (
    <View style={styles.usageCard}>
      <View style={styles.usageHeader}>
        <Text style={styles.usageLabel}>{label}</Text>
        <Text style={[styles.usageValue, isNearLimit && styles.usageWarning]}>
          {value.toLocaleString()}
          {unit} / {limit.toLocaleString()}
          {unit}
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(percentage, 100)}%` },
            isNearLimit && styles.progressWarning,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  welcomeCard: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#BFDBFE",
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  planCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  planPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
  },
  planStatus: {
    fontSize: 14,
    color: "#22C55E",
    marginTop: 8,
  },
  usageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  usageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  usageLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  usageValue: {
    fontSize: 14,
    color: "#6B7280",
  },
  usageWarning: {
    color: "#F59E0B",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#22C55E",
    borderRadius: 3,
  },
  progressWarning: {
    backgroundColor: "#F59E0B",
  },
});
