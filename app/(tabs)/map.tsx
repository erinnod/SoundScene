import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import MapView, { Marker, Callout } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { mockEvents } from "@/data/mockData";
import Theme from "@/constants/Colors";

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showingResults, setShowingResults] = useState(false);

  // Birmingham, UK coordinates
  const birminghamCoordinates = {
    latitude: 52.4862,
    longitude: -1.8904,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Filter events based on search query
  const filteredEvents = mockEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.genreTags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Categories for filtering
  const categories = ["All", "Concert", "Sport", "Stand Up", "Electronic"];

  // Navigate to event details
  const goToEventDetails = (id: string) => {
    router.push({
      pathname: "/event/[id]",
      params: { id },
    });
  };

  // Handle search input
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setShowingResults(text.length > 0);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setShowingResults(false);
  };

  // Custom map style for dark mode
  const darkMapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#181818",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1b1b1b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c2c2c",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8a8a8a",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#373737",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#3c3c3c",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#4e4e4e",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3d3d3d",
        },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />

      {/* Search Section */}
      <View className="p-4 border-b border-[#333333]">
        <View className="flex-row bg-[#111111] rounded-3xl items-center px-4 h-12 border border-[#333333]">
          <FontAwesome
            name="search"
            size={18}
            color="#FFFFFF"
            style={{ marginRight: 10 }}
          />
          <TextInput
            className="flex-1 text-base text-white h-full"
            placeholder="Search events, venues, or artists..."
            placeholderTextColor="#777777"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={clearSearch}>
              <FontAwesome name="times" size={18} color="#AAAAAA" />
            </Pressable>
          )}
        </View>

        {/* Categories */}
        <ScrollView
          className="pt-4 pb-1 gap-[10px]"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category) => (
            <Pressable
              key={category}
              className={`py-2 px-4 rounded-2xl mr-[10px] border border-white ${
                selectedCategory === category ? "bg-white" : "bg-black"
              }`}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                className={`text-xs font-semibold ${
                  selectedCategory === category ? "text-black" : "text-white"
                }`}
              >
                {category.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {showingResults ? (
        <ScrollView className="flex-1 p-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Pressable
                key={event.id}
                className="flex-row bg-secondary rounded-lg mb-4 overflow-hidden"
                onPress={() => goToEventDetails(event.id)}
              >
                <View className="w-20 bg-secondary">
                  <Image
                    source={{
                      uri: event.imageUrl || "https://via.placeholder.com/60",
                    }}
                    className="w-20 h-full object-cover"
                  />
                </View>
                <View className="flex-1 p-3">
                  <Text className="text-base font-bold text-black mb-1">
                    {event.title.toUpperCase()}
                  </Text>
                  <Text className="text-sm text-black mb-2">
                    {event.venueName}, {event.address}
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-black">
                      {new Date(event.date).toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Text>
                    <View className="bg-black px-2 py-1 rounded">
                      <Text className="text-xs font-bold text-white">
                        {event.price || "€45.00"}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))
          ) : (
            <View className="flex-1 items-center justify-center pt-[60px]">
              <FontAwesome name="search" size={50} color="#555555" />
              <Text className="text-lg font-bold text-white mt-4 mb-2">
                NO RESULTS FOUND
              </Text>
              <Text className="text-sm text-gray-500 text-center">
                Try different keywords or browse categories
              </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View className="flex-1 relative">
          <MapView
            className="w-full h-full"
            initialRegion={birminghamCoordinates}
            customMapStyle={darkMapStyle}
          >
            {mockEvents.map((event) => (
              <Marker
                key={event.id}
                coordinate={{
                  latitude: event.latitude,
                  longitude: event.longitude,
                }}
                pinColor={Theme.accent}
                onCalloutPress={() => goToEventDetails(event.id)}
              >
                <Callout>
                  <View className="w-40 p-2.5 bg-black">
                    <Text className="text-sm font-bold text-white mb-1">
                      {event.title}
                    </Text>
                    <Text className="text-xs text-gray-300 mb-0.5">
                      {event.venueName}
                    </Text>
                    <Text className="text-xs text-gray-300">
                      {new Date(event.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>

          <View className="absolute top-5 left-5 right-5 p-4 bg-black/80 rounded-lg">
            <Text className="text-lg font-bold text-white mb-1">
              FIND EVENTS NEAR YOU
            </Text>
            <Text className="text-sm text-gray-400">
              Explore upcoming events on the map
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
