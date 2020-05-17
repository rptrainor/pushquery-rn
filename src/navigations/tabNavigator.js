import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import { BACKGROUND, HIGHLIGHT_DARK, INACTIVE_ICON_GRAY, PARAGRAPH_COLOR } from "../styles/colors";

// importing components
import Home from "../scenes/Home";
import createNavigation from "./createNavigation";
import authNavigator from "./authNavigator";
// pulling out the bottom tab navigator from react-navigation
const Tab = createBottomTabNavigator();

export default function tabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Me":
              iconName = focused ? "user-circle" : "user-circle-o";
              break;
            case "Create":
              iconName = focused ? "plus-square" : "plus-square-o";
              break;
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#000",
        inactiveTintColor: INACTIVE_ICON_GRAY,
        style: {
          backgroundColor: BACKGROUND,
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create" component={createNavigation} />
      <Tab.Screen name="Me" component={authNavigator} />
    </Tab.Navigator>
  );
}
