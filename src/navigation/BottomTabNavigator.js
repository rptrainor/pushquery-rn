import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// importing components
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Profile from "../screens/Profile";
// pulling out the bottom tab navigator from react-navigation
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Signup" component={Signup} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
