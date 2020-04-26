import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// importing components
import Home from "../screens/Home";
import Profile from "../screens/Profile";

// pulling out the bottom tab navigator from react-navigation
const Tab = createBottomTabNavigator();

export default function tabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Me" component={Profile} />
    </Tab.Navigator>
  );
}
