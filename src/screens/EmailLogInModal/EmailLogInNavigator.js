import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";

// creating the Email Sign Up Stack
const EmailSignUpStack = createStackNavigator();

export default function EmailLogInNavigator() {
  return (
    <EmailSignUpStack.Navigator initialRouteName="Sign Up">
      <EmailSignUpStack.Screen
        name="Log In"
        component={Login}
        options={{ headerShown: false }}
      />
    </EmailSignUpStack.Navigator>
  );
}
