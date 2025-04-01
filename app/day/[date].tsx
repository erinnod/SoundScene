import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { mockEvents } from "@/data/mockData";

export default function DayEventsScreen() {
  const { date } = useLocalSearchParams();
  const displayDate = date ? new Date(String(date)) : new Date();

  // Format date for display
  const formatDay = (date: Date) => {
    return date.getDate();
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleString("default", { month: "short" }).toUpperCase();
  };

  // Filter events for this day
  const dayEvents = mockEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === displayDate.getDate() &&
      eventDate.getMonth() === displayDate.getMonth() &&
      eventDate.getFullYear() === displayDate.getFullYear()
    );
  });

  // Event item with custom styling for the day view
  const renderEventItem = ({ item, index }: { item: any; index: number }) => {
    const eventDate = new Date(item.date);
    const timeString = eventDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Generate random avatar count for demo purposes
    const avatarCount = Math.floor(Math.random() * 3) + 1;

    // Function to get tag background color
    const getTagColor = (tag: string): string => {
      const tagColors: Record<string, string> = {
        Rock: "#E74C3C",
        Jazz: "#3498DB",
        Classical: "#9B59B6",
        Electronic: "#2ECC71",
        "Hip Hop": "#F39C12",
        Indie: "#1ABC9C",
        Folk: "#D35400",
        Acoustic: "#16A085",
        Family: "#E74C3C",
        Blues: "#2980B9",
        Alternative: "#8E44AD",
      };

      return tagColors[tag] || "#7F8C8D";
    };

    return (
      <View style={styles.eventItem}>
        <View style={styles.timeSection}>
          <Text style={styles.timeText}>{timeString}</Text>
        </View>

        <View style={styles.eventContent}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <View style={styles.tagsRow}>
            {item.genreTags.slice(0, 1).map((tag: string, tagIndex: number) => (
              <View
                key={tagIndex}
                style={[styles.tag, { backgroundColor: getTagColor(tag) }]}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.avatarRow}>
          {Array.from({ length: avatarCount }).map((_, i) => (
            <View key={i} style={[styles.avatar, { right: i * 12 }]} />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Text style={styles.headerTitle}>Local Events Today</Text>
          ),
          headerRight: () => (
            <Pressable style={styles.addButton}>
              <FontAwesome name="plus" size={18} color="#FFFFFF" />
            </Pressable>
          ),
        }}
      />

      <View style={styles.dateHeader}>
        <View style={styles.dateContainer}>
          <Text style={styles.dayText}>{formatDay(displayDate)}</Text>
          <Text style={styles.monthText}>{formatMonth(displayDate)}</Text>
        </View>
      </View>

      <FlatList
        data={dayEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No events found for this date.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  dateHeader: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dayText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginRight: 8,
  },
  monthText: {
    fontSize: 16,
    color: "#777777",
    textTransform: "uppercase",
  },
  eventsList: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  eventItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginVertical: 8,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
  },
  timeSection: {
    marginRight: 16,
  },
  timeText: {
    fontSize: 14,
    color: "#777777",
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginVertical: 4,
  },
  tagText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E1E1E1",
    position: "relative",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
  },
});
