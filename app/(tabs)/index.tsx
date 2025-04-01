import React, { useState, useMemo } from "react";
import {
  FlatList,
  Pressable,
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { mockEvents } from "@/data/mockData";
import { Stack, useRouter } from "expo-router";
import "nativewind";

// Type for FontAwesome icon names
type FontAwesomeIconName =
  | "calendar"
  | "globe"
  | "euro"
  | "search"
  | "plus"
  | "bars"
  | "ticket"
  | "home";

// Category options
type Category = "date" | "worldwide" | "price";
type EventCategory = "concert" | "sport" | "stand_up" | "electronic";

// Badge component
const Badge = ({ type, text }: { type: string; text: string }) => {
  return (
    <View
      className={`px-2.5 py-0.5 rounded mb-1 mr-2.5 ${
        type === "selling-fast" ? "bg-black" : "bg-red-600"
      }`}
    >
      <Text className="text-white text-xs font-bold">{text}</Text>
    </View>
  );
};

// Category Pill component
const CategoryPill = ({
  label,
  icon,
  isSelected,
  onPress,
}: {
  label: string;
  icon?: FontAwesomeIconName;
  isSelected: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      className={`flex-row items-center px-4 py-2 rounded-full border border-white ${
        isSelected ? "bg-white" : "bg-black"
      }`}
      onPress={onPress}
    >
      {icon && (
        <FontAwesome
          name={icon}
          size={16}
          color={isSelected ? "#000000" : "#FFFFFF"}
          style={{ marginRight: 6 }}
        />
      )}
      <Text
        className={`text-xs font-semibold ${
          isSelected ? "text-black" : "text-white"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
};

// Event Card component
const EventCard = ({
  event,
  isSoldOut = false,
  isSellingFast = false,
  onPress,
}: {
  event: any;
  isSoldOut?: boolean;
  isSellingFast?: boolean;
  onPress: (id: string) => void;
}) => {
  const hasBadges = isSoldOut || isSellingFast;

  // Format date range helper
  const formatDateRange = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate || startDate);

    const formatMonth = (date: Date) =>
      date.toLocaleString("default", { month: "long" });
    const formatDay = (date: Date) => date.getDate();
    const formatYear = (date: Date) => date.getFullYear();

    if (formatYear(start) === formatYear(end)) {
      if (formatMonth(start) === formatMonth(end)) {
        return `${formatMonth(start)} ${formatDay(start)} - ${formatDay(
          end
        )}, ${formatYear(end)}`;
      } else {
        return `${formatMonth(start)} ${formatDay(start)} - ${formatMonth(
          end
        )} ${formatDay(end)}, ${formatYear(end)}`;
      }
    } else {
      return `${formatMonth(start)} ${formatDay(start)}, ${formatYear(
        start
      )} - ${formatMonth(end)} ${formatDay(end)}, ${formatYear(end)}`;
    }
  };

  return (
    <Pressable
      className="bg-secondary rounded-2xl mx-4 mb-5 flex-row overflow-hidden"
      onPress={() => onPress(event.id)}
    >
      <View className="flex-1 p-4">
        <View className="flex-row items-start mb-1">
          <View className={`flex-1 ${hasBadges ? "pr-8" : ""}`}>
            <Text
              className="text-lg font-bold text-black mb-0.5"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {event.title.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text className="text-xs text-black mb-0.5">
          {formatDateRange(event.date, event.endDate)}
        </Text>

        <Text className="text-xs text-black mb-2">
          {Math.floor(Math.random() * 50) + 1} Events
        </Text>

        <View className="mb-3">
          <View>
            <Text className="text-xs font-bold text-black">Date:</Text>
            <Text className="text-xs text-black mb-1">
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </View>

          <View>
            <Text className="text-xs font-bold text-black">Location:</Text>
            <Text className="text-xs text-black mb-1">{event.venueName}</Text>
          </View>

          <View>
            <Text className="text-xs font-bold text-black">Price From:</Text>
            <Text className="text-xs text-black mb-1">
              €{(Math.random() * 100).toFixed(2)}
            </Text>
          </View>
        </View>

        <View className="self-start px-2.5 py-1 border border-black rounded">
          <Text className="text-[10px] font-bold text-black">DETAILS</Text>
        </View>
      </View>

      <View className="w-20 justify-center items-center bg-secondary">
        <Image
          source={{ uri: event.imageUrl || "https://via.placeholder.com/80" }}
          className="w-[70px] h-[70px] rounded"
        />
      </View>

      {hasBadges && (
        <View className="absolute right-0 top-4 z-10">
          {isSellingFast && <Badge type="selling-fast" text="SELLING FAST" />}
          {isSoldOut && <Badge type="sold-out" text="SOLD OUT" />}
        </View>
      )}
    </Pressable>
  );
};

// Featured Event component
const FeaturedEvent = () => {
  return (
    <View className="bg-black py-10 mb-8">
      <View className="items-center">
        <Text className="text-white text-sm mb-0.5">Wednesday</Text>
        <Text className="text-white text-base font-bold my-0.5">
          River Hayes
        </Text>
        <Text className="text-white text-sm mb-0.5">(Dance Village)</Text>
        <Text className="text-white text-sm mb-0.5">28 June 2024</Text>

        <View className="mt-2.5 mb-4">
          <Text className="text-white text-3xl font-bold leading-9 text-center">
            LITTLE SIMZ
          </Text>
          <Text className="text-white text-3xl font-bold leading-9 text-center">
            GLASTONBURY
          </Text>
          <Text className="text-white text-3xl font-bold leading-9 text-center">
            FESTIVAL 2024
          </Text>
        </View>

        <Pressable className="bg-accent px-8 py-3 rounded mt-5">
          <Text className="text-white text-base font-bold">BUY NOW</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default function EventsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category>("date");
  const [selectedEventCategory, setSelectedEventCategory] =
    useState<EventCategory | null>(null);

  // Filter events based on selected category
  const filteredEvents = useMemo(() => {
    // Just return all events for now, we'd implement actual filtering logic based on selection
    return mockEvents.slice(0, 3); // Just show a few events for the example
  }, [selectedCategory, selectedEventCategory]);

  // Navigate to event details
  const goToEventDetails = (id: string) => {
    router.push({
      pathname: "/event/[id]",
      params: { id },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <>
            {/* Category Pills */}
            <View className="flex-row justify-center py-4 gap-2.5">
              <CategoryPill
                label="DATE"
                icon="calendar"
                isSelected={selectedCategory === "date"}
                onPress={() => setSelectedCategory("date")}
              />
              <CategoryPill
                label="WORLDWIDE"
                icon="globe"
                isSelected={selectedCategory === "worldwide"}
                onPress={() => setSelectedCategory("worldwide")}
              />
              <CategoryPill
                label="PRICE"
                icon="euro"
                isSelected={selectedCategory === "price"}
                onPress={() => setSelectedCategory("price")}
              />
            </View>

            {/* Event Type Pills */}
            <View className="flex-row flex-wrap justify-center pb-5 gap-2.5">
              <CategoryPill
                label="CONCERT"
                isSelected={selectedEventCategory === "concert"}
                onPress={() => setSelectedEventCategory("concert")}
              />
              <CategoryPill
                label="SPORT"
                isSelected={selectedEventCategory === "sport"}
                onPress={() => setSelectedEventCategory("sport")}
              />
              <CategoryPill
                label="STAND UP"
                isSelected={selectedEventCategory === "stand_up"}
                onPress={() => setSelectedEventCategory("stand_up")}
              />
              <CategoryPill
                label="ELECTRONIC"
                isSelected={selectedEventCategory === "electronic"}
                onPress={() => setSelectedEventCategory("electronic")}
              />
            </View>

            <FeaturedEvent />

            <Text className="text-2xl font-bold text-white mb-4 ml-4 uppercase">
              TOP TOURS WORLDWIDE
            </Text>

            <EventCard
              event={mockEvents[0]}
              isSellingFast={true}
              onPress={goToEventDetails}
            />
            <EventCard event={mockEvents[1]} onPress={goToEventDetails} />
            <EventCard
              event={mockEvents[2]}
              isSoldOut={true}
              onPress={goToEventDetails}
            />
          </>
        )}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={goToEventDetails} />
        )}
        className="pb-5"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
