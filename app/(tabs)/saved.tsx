import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { mockEvents } from "@/data/mockData";
import Theme from "@/constants/Colors";

// Convert short day name to abbreviated display form
const getDayAbbreviation = (dayIndex: number): string => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return days[dayIndex];
};

// Convert month index to abbreviated display form
const getMonthAbbreviation = (monthIndex: number): string => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return months[monthIndex];
};

// Get days in month
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Get first day of month (day of week index)
const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export default function SavedScreen() {
  const router = useRouter();

  // Date state
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

  // Month tabs
  const [visibleMonths, setVisibleMonths] = useState<string[]>([]);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(currentMonth);

  // Calendar grid data
  const [calendarDays, setCalendarDays] = useState<
    Array<{ day: number; isCurrentMonth: boolean }>
  >([]);

  // Upcoming events
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  // Initialize visible months
  useEffect(() => {
    const months = [];
    for (let i = 0; i < 4; i++) {
      const monthIndex = (currentMonth + i) % 12;
      months.push(getMonthAbbreviation(monthIndex));
    }
    setVisibleMonths(months);
  }, [currentMonth]);

  // Generate calendar grid data
  useEffect(() => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentYear, selectedMonthIndex);
    const firstDay = getFirstDayOfMonth(currentYear, selectedMonthIndex);

    // Add days from previous month to fill the first row
    const prevMonth = selectedMonthIndex === 0 ? 11 : selectedMonthIndex - 1;
    const prevMonthYear =
      selectedMonthIndex === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

    for (let i = 0; i < firstDay; i++) {
      days.push({
        day: daysInPrevMonth - firstDay + i + 1,
        isCurrentMonth: false,
      });
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
      });
    }

    // Add days from next month to complete the grid (up to 42 cells for a 6x7 grid)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    setCalendarDays(days);
  }, [currentYear, selectedMonthIndex]);

  // Get upcoming events
  useEffect(() => {
    // Filter events that are upcoming (after current date)
    const now = new Date();
    const upcoming = mockEvents
      .filter((event) => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3); // Get first 3 upcoming events

    setUpcomingEvents(upcoming);
  }, []);

  // Handle month selection
  const selectMonth = (index: number) => {
    setSelectedMonthIndex(index);
  };

  // Handle day selection
  const selectDay = (day: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      setSelectedDay(day);
      const newDate = new Date(currentYear, selectedMonthIndex, day);
      setSelectedDate(newDate);
    }
  };

  // Navigate to event detail
  const goToEventDetail = (id: string) => {
    router.push({
      pathname: "/event/[id]",
      params: { id },
    });
  };

  // Group events by day
  const eventsByDay: Record<string, any[]> = {};
  upcomingEvents.forEach((event) => {
    const date = new Date(event.date);
    const day = date.getDate();
    if (!eventsByDay[day]) {
      eventsByDay[day] = [];
    }
    eventsByDay[day].push(event);
  });

  // Render calendar day
  const renderDay = (
    item: { day: number; isCurrentMonth: boolean },
    index: number
  ) => {
    const isSelected = item.isCurrentMonth && item.day === selectedDay;
    const hasEvent =
      item.isCurrentMonth &&
      Object.keys(eventsByDay).includes(item.day.toString());

    return (
      <Pressable
        key={index}
        className={`w-12 h-12 justify-center items-center m-1 rounded-md ${
          !item.isCurrentMonth ? "opacity-40" : ""
        } ${isSelected ? "bg-accent" : ""} ${
          hasEvent && !isSelected ? "bg-gray-200" : ""
        }`}
        onPress={() => selectDay(item.day, item.isCurrentMonth)}
      >
        <Text
          className={`text-base ${
            !item.isCurrentMonth ? "text-gray-400" : "text-black"
          } ${isSelected ? "text-white font-bold" : ""}`}
        >
          {item.day}
        </Text>
      </Pressable>
    );
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />

      <View className="items-center py-5 px-4">
        <Text className="text-2xl font-bold text-white">{currentYear}</Text>
      </View>

      <View className="flex-row justify-around pb-2.5 border-b border-[#333333]">
        {visibleMonths.map((month, index) => {
          const monthIndex = (currentMonth + index) % 12;
          const isSelected = monthIndex === selectedMonthIndex;
          return (
            <Pressable
              key={index}
              className="px-3 pb-2 items-center relative"
              onPress={() => selectMonth(monthIndex)}
            >
              <Text
                className={`text-base ${
                  isSelected ? "font-bold text-white" : "text-gray-500"
                }`}
              >
                {month}
              </Text>
              {isSelected && (
                <View className="absolute bottom-0 w-5 h-0.5 bg-white" />
              )}
            </Pressable>
          );
        })}
      </View>

      <View className="px-4 py-4">
        <View className="flex-row justify-between mb-4">
          {[0, 1, 2, 3, 4, 5, 6].map((day) => (
            <Text
              key={day}
              className="w-10 text-center text-base font-bold text-white"
            >
              {getDayAbbreviation(day)}
            </Text>
          ))}
        </View>

        <View className="flex-row flex-wrap justify-between">
          {calendarDays.map((item, index) => renderDay(item, index))}
        </View>
      </View>

      <View className="py-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 gap-2.5"
        >
          <Pressable className="flex-row items-center px-4 py-2 rounded-2xl bg-black border border-white mr-2">
            <FontAwesome
              name="calendar"
              size={16}
              color="#FFFFFF"
              style={{ marginRight: 5 }}
            />
            <Text className="text-white font-semibold text-xs">DATE</Text>
          </Pressable>

          <Pressable className="flex-row items-center px-4 py-2 rounded-2xl bg-black border border-white mr-2">
            <FontAwesome
              name="globe"
              size={16}
              color="#FFFFFF"
              style={{ marginRight: 5 }}
            />
            <Text className="text-white font-semibold text-xs">WORLDWIDE</Text>
          </Pressable>

          <Pressable className="flex-row items-center px-4 py-2 rounded-2xl bg-black border border-white mr-2">
            <FontAwesome
              name="euro"
              size={16}
              color="#FFFFFF"
              style={{ marginRight: 5 }}
            />
            <Text className="text-white font-semibold text-xs">PRICE</Text>
          </Pressable>

          <Pressable className="flex-row items-center px-4 py-2 rounded-2xl bg-black border border-white mr-2">
            <FontAwesome
              name="music"
              size={16}
              color="#FFFFFF"
              style={{ marginRight: 5 }}
            />
            <Text className="text-white font-semibold text-xs">CONCERT</Text>
          </Pressable>
        </ScrollView>
      </View>

      <View className="flex-1 p-4">
        <Text className="text-lg font-bold text-white mb-4">
          UPCOMING SAVED EVENTS
        </Text>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {upcomingEvents.map((event, index) => (
            <Pressable
              key={index}
              className="flex-row bg-secondary rounded-lg mb-4 overflow-hidden"
              onPress={() => goToEventDetail(event.id)}
            >
              <View className="w-[60px] h-20">
                <Image
                  source={{
                    uri: event.imageUrl || "https://via.placeholder.com/60",
                  }}
                  className="w-full h-full object-cover"
                />
              </View>
              <View className="flex-1 p-3 justify-center">
                <Text className="text-sm font-bold text-black mb-1">
                  {event.title.toUpperCase()}
                </Text>
                <Text className="text-xs text-black mb-0.5">
                  {formatDate(event.date)}
                </Text>
                <Text className="text-xs text-black opacity-80">
                  {event.venueName}
                </Text>
              </View>
              <Pressable className="w-[60px] justify-center items-center bg-black">
                <Text className="text-white text-xs font-bold">DETAILS</Text>
              </Pressable>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
