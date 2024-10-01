import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Goals",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: "Add Goal",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused
                  ? "checkmark-done-circle"
                  : "checkmark-done-circle-outline"
              }
              color={color}
            />
          ),
        }}
      />
      {/*<Tabs.Screen*/}
      {/*  name="wishes"*/}
      {/*  options={{*/}
      {/*    title: "Wishes",*/}
      {/*    tabBarIcon: ({ color, focused }) => (*/}
      {/*      <TabBarIcon*/}
      {/*        name={focused ? "heart" : "heart-outline"}*/}
      {/*        color={color}*/}
      {/*      />*/}
      {/*    ),*/}
      {/*  }}*/}
      {/*/>*/}
    </Tabs>
  );
}
