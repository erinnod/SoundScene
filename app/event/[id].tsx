import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { mockEvents } from "@/data/mockData";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  // Format date for display
  const formatDateRange = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDate = date.toLocaleDateString(undefined, options);
    const startTime = date.toLocaleTimeString(undefined, timeOptions);

    // Add 5 hours for end time for demo purposes
    const endDate = new Date(date);
    endDate.setHours(endDate.getHours() + 5);
    const endTime = endDate.toLocaleTimeString(undefined, timeOptions);

    return `${formattedDate}, ${startTime} - ${endTime}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Text style={styles.headerTitle}>MusicVibes Birmingham</Text>
          ),
          headerTintColor: "#009688",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <FontAwesome name="chevron-left" size={16} color="#009688" />
              <Text style={styles.backText}>Back</Text>
            </Pressable>
          ),
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.scrollView}>
        {event.imageUrl ? (
          <Image
            source={{ uri: event.imageUrl }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <FontAwesome name="music" size={50} color="#FFFFFF" />
          </View>
        )}

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{event.title}</Text>

          <Text style={styles.description}>{event.description}</Text>

          <Text style={styles.sectionTitle}>Venue Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>
              {event.venueName}, {event.address}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date & Time:</Text>
            <Text style={styles.detailValue}>
              {formatDateRange(event.date)}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Price</Text>
          <Text style={styles.priceValue}>{event.price} per person</Text>

          <Pressable style={styles.purchaseButton}>
            <Text style={styles.purchaseButtonText}>Purchase Tickets</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#009688",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#009688",
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#777777",
  },
  bannerImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 16,
  },
  placeholderImage: {
    width: "100%",
    height: 240,
    backgroundColor: "#009688",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 16,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#444444",
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 12,
    marginTop: 8,
  },
  detailRow: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444444",
  },
  detailValue: {
    fontSize: 16,
    color: "#444444",
  },
  priceValue: {
    fontSize: 18,
    color: "#444444",
    marginBottom: 24,
  },
  purchaseButton: {
    backgroundColor: "#009688",
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  purchaseButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
