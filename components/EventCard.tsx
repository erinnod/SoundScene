import React from "react";
import { View, Text, Image, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { EventType } from "@/data/mockData";
import "nativewind";

interface EventCardProps {
  event: EventType;
}

export default function EventCard({ event }: EventCardProps) {
  // Format date string for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }),
      weekday: date.toLocaleString("default", { weekday: "short" }),
      time: date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    };
  };

  const formattedDate = formatDate(event.date);

  // Get tag style based on tag name
  const getTagStyle = (tag: string): string => {
    // Return different background colors based on the tag
    const tagColors: Record<string, string> = {
      Rock: "bg-red-500",
      Jazz: "bg-blue-500",
      Classical: "bg-purple-500",
      Electronic: "bg-green-500",
      "Hip Hop": "bg-yellow-500",
      Indie: "bg-teal-500",
      Folk: "bg-orange-500",
      Acoustic: "bg-teal-700",
      Blues: "bg-blue-700",
      Alternative: "bg-purple-700",
    };

    return tagColors[tag] || "bg-teal-500";
  };

  return (
    <View className="bg-white rounded-lg mx-4 my-2 overflow-hidden shadow-sm">
      {event.imageUrl ? (
        <Image
          source={{ uri: event.imageUrl }}
          className="w-full h-30"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-30 bg-teal-500 justify-center items-center">
          <FontAwesome name="music" size={24} color="#FFFFFF" />
        </View>
      )}

      <View className="p-3">
        <Text className="text-base font-bold text-gray-800 mb-2">
          {event.title}
        </Text>

        <View className="flex-row items-center mb-1">
          <FontAwesome
            name="map-marker"
            size={14}
            color="#777777"
            style={{ marginRight: 6 }}
          />
          <Text className="text-sm text-gray-600">{event.venueName}</Text>
        </View>

        <View className="flex-row">
          <View className="flex-row items-center mr-4">
            <FontAwesome
              name="calendar"
              size={14}
              color="#777777"
              style={{ marginRight: 6, width: 14, textAlign: "center" }}
            />
            <Text className="text-xs text-gray-500">
              {formattedDate.weekday}, {formattedDate.month} {formattedDate.day}
            </Text>
          </View>

          <View className="flex-row items-center">
            <FontAwesome
              name="clock-o"
              size={14}
              color="#777777"
              style={{ marginRight: 6, width: 14, textAlign: "center" }}
            />
            <Text className="text-xs text-gray-500">{formattedDate.time}</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-2">
          {event.genreTags.slice(0, 1).map((tag, index) => (
            <View
              key={index}
              className={`rounded px-2 py-0.5 ${getTagStyle(tag)}`}
            >
              <Text className="text-xs text-white font-medium">{tag}</Text>
            </View>
          ))}
          <Text className="text-sm font-bold text-teal-600">{event.price}</Text>
        </View>
      </View>
    </View>
  );
}
