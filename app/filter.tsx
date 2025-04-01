import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Switch,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { mockEvents } from "@/data/mockData";

// Extract unique genres from mock data
const allGenres = Array.from(
  new Set(mockEvents.flatMap((event) => event.genreTags))
).sort();

// Define price filter options
const priceOptions = [
  { label: "Free", value: "free" },
  { label: "Under $10", value: "under10" },
  { label: "Under $20", value: "under20" },
  { label: "Any Price", value: "any" },
];

export default function FilterScreen() {
  const router = useRouter();

  // Filter state
  const [dateRange, setDateRange] = useState("week"); // 'today', 'week', 'month', 'all'
  const [selectedGenres, setSelectedGenres] = useState<Record<string, boolean>>(
    Object.fromEntries(allGenres.map((genre) => [genre, false]))
  );
  const [priceFilter, setPriceFilter] = useState("any");

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) => ({
      ...prev,
      [genre]: !prev[genre],
    }));
  };

  const handlePriceSelect = (value: string) => {
    setPriceFilter(value);
  };

  const handleReset = () => {
    setDateRange("week");
    setSelectedGenres(
      Object.fromEntries(allGenres.map((genre) => [genre, false]))
    );
    setPriceFilter("any");
  };

  const handleApply = () => {
    // In a real app, we would pass these filters back to the main screen
    // For now, just close the modal
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Filter Events",
          presentation: "modal",
          headerLeft: () => (
            <Pressable style={styles.headerButton} onPress={handleReset}>
              <Text style={styles.resetText}>Reset</Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable style={styles.headerButton} onPress={handleApply}>
              <Text style={styles.applyText}>Apply</Text>
            </Pressable>
          ),
        }}
      />

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date Range</Text>
          <View style={styles.optionsContainer}>
            <Pressable
              style={[
                styles.dateOption,
                dateRange === "today" && styles.dateOptionSelected,
              ]}
              onPress={() => setDateRange("today")}
            >
              <Text
                style={[
                  styles.dateOptionText,
                  dateRange === "today" && styles.dateOptionTextSelected,
                ]}
              >
                Today
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.dateOption,
                dateRange === "week" && styles.dateOptionSelected,
              ]}
              onPress={() => setDateRange("week")}
            >
              <Text
                style={[
                  styles.dateOptionText,
                  dateRange === "week" && styles.dateOptionTextSelected,
                ]}
              >
                This Week
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.dateOption,
                dateRange === "month" && styles.dateOptionSelected,
              ]}
              onPress={() => setDateRange("month")}
            >
              <Text
                style={[
                  styles.dateOptionText,
                  dateRange === "month" && styles.dateOptionTextSelected,
                ]}
              >
                This Month
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.dateOption,
                dateRange === "all" && styles.dateOptionSelected,
              ]}
              onPress={() => setDateRange("all")}
            >
              <Text
                style={[
                  styles.dateOptionText,
                  dateRange === "all" && styles.dateOptionTextSelected,
                ]}
              >
                All Time
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price</Text>
          {priceOptions.map((option) => (
            <Pressable
              key={option.value}
              style={styles.checkboxRow}
              onPress={() => handlePriceSelect(option.value)}
            >
              <Text style={styles.checkboxLabel}>{option.label}</Text>
              <View style={styles.radioCircle}>
                {priceFilter === option.value && (
                  <View style={styles.radioSelected} />
                )}
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genres</Text>
          {allGenres.map((genre) => (
            <Pressable
              key={genre}
              style={styles.checkboxRow}
              onPress={() => handleGenreToggle(genre)}
            >
              <Text style={styles.checkboxLabel}>{genre}</Text>
              <View
                style={[
                  styles.checkbox,
                  selectedGenres[genre] && styles.checkboxSelected,
                ]}
              >
                {selectedGenres[genre] && (
                  <FontAwesome name="check" size={12} color="#FFFFFF" />
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  resetText: {
    color: "#777777",
    fontSize: 16,
  },
  applyText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateOption: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#F8F8F8",
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  dateOptionSelected: {
    backgroundColor: "#007AFF",
  },
  dateOptionText: {
    color: "#777777",
    fontSize: 14,
  },
  dateOptionTextSelected: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  checkboxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F8F8F8",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333333",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
});
