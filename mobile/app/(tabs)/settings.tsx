import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Settings Screen
 * App configuration and account settings
 */
export default function SettingsScreen() {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingsItem label="Email" value="john@example.com" />
          <SettingsItem label="Name" value="John Doe" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <SettingsItem label="Notifications" value="Enabled" showArrow />
          <SettingsItem label="Theme" value="System" showArrow />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingsItem label="Help Center" showArrow />
          <SettingsItem label="Contact Support" showArrow />
          <SettingsItem label="Privacy Policy" showArrow />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Log out of your account"
        >
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </Pressable>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

interface SettingsItemProps {
  label: string;
  value?: string;
  showArrow?: boolean;
}

function SettingsItem({ label, value, showArrow }: SettingsItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.settingsItem,
        pressed && styles.settingsItemPressed,
      ]}
      accessibilityRole="button"
    >
      <Text style={styles.settingsLabel}>{label}</Text>
      <View style={styles.settingsRight}>
        {value && <Text style={styles.settingsValue}>{value}</Text>}
        {showArrow && <Text style={styles.arrow}>›</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    // Touch target: minimum 44pt
    minHeight: 48,
  },
  settingsItemPressed: {
    backgroundColor: "#F3F4F6",
  },
  settingsLabel: {
    fontSize: 16,
    color: "#111827",
  },
  settingsRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsValue: {
    fontSize: 16,
    color: "#6B7280",
    marginRight: 8,
  },
  arrow: {
    fontSize: 20,
    color: "#9CA3AF",
  },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    // Touch target: minimum 44pt
    minHeight: 52,
    justifyContent: "center",
  },
  logoutButtonPressed: {
    backgroundColor: "#FEF2F2",
  },
  logoutButtonText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
  version: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 24,
  },
});
