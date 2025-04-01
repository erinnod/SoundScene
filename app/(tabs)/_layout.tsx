import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View, Text } from "react-native";

import Theme from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.tabBar.active,
        tabBarInactiveTintColor: Theme.tabBar.inactive,
        tabBarStyle: {
          backgroundColor: Theme.tabBar.background,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: Theme.primary,
          borderBottomWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          color: Theme.text.secondary,
          fontWeight: "bold",
          fontSize: 24,
          textTransform: "uppercase",
        },
        headerTitle: () => (
          <View className="ml-4">
            <Text className="text-3xl font-bold text-white tracking-wider">
              mx・ticket
            </Text>
          </View>
        ),
        headerRight: () => (
          <View className="flex-row mr-4">
            <Pressable className="w-10 h-10 justify-center items-center mx-1">
              <FontAwesome
                name="search"
                size={20}
                color={Theme.text.secondary}
              />
            </Pressable>
            <Pressable className="w-10 h-10 justify-center items-center mx-1">
              <FontAwesome name="bars" size={20} color={Theme.text.secondary} />
            </Pressable>
          </View>
        ),
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={22} color={color} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={22} color={color} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="ticket" size={22} color={color} />
          ),
          tabBarLabel: "",
        }}
      />
    </Tabs>
  );
}
