import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import {
  BACKGROUND,
  INACTIVE_ICON_GRAY,
  PARAGRAPH_COLOR,
} from "../styles/colors";

// importing components
import createNavigation from "./createNavigation";
import authNavigator from "./authNavigator";
import homeNavigator from "./homeNavigator";
import Values from '../components/organisms/Values'
// pulling out the bottom tab navigator from react-navigation
const Tab = createBottomTabNavigator();

export default function tabNavigator({ route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTintColor: PARAGRAPH_COLOR,
        headerStyle: { backgroundColor: BACKGROUND },
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
              case "Our Values":
                iconName = focused ? "heart" : "heart-o";
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
      <Tab.Screen name="Home" component={homeNavigator} route={route} />
      <Tab.Screen name="Create" component={createNavigation} />
      <Tab.Screen name="Our Values" component={Values} />
      <Tab.Screen name="Me" component={authNavigator} />
    </Tab.Navigator>
  );
}
