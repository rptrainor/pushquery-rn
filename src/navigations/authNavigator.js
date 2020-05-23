import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "../../globalState";
import Profile from "../scenes/Profile";
import LogIn from "../scenes/LogIn";
import SignUp from "../scenes/SignUp";

const AuthStack = createStackNavigator();

export default function authNavigator() {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <AuthStack.Navigator>
      {currentUser ? (
        <AuthStack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      ) : (
        <React.Fragment>
          <AuthStack.Screen
            name="Log In"
            component={LogIn}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="Sign Up"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </React.Fragment>
      )}
    </AuthStack.Navigator>
  );
}
