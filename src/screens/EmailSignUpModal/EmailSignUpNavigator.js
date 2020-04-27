import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "./Signup";

// creating the Email Sign Up Stack
const EmailSignUpStack = createStackNavigator();

export default function EmailSignUpNavigator() {
  return (
    <EmailSignUpStack.Navigator initialRouteName="Sign Up">
      <EmailSignUpStack.Screen
        name="Sign Up"
        component={Signup}
        options={{ headerShown: false }}
      />
    </EmailSignUpStack.Navigator>
  );
}
