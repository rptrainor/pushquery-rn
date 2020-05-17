import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "../../globalState";
import Create from "../scenes/Create";
import LogIn from "../components/organisms/LogIn";
import SignUp from "../components/organisms/SignUp";

const AuthStack = createStackNavigator();

export default function createNavigator() {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <AuthStack.Navigator>
      {currentUser ? (
        <AuthStack.Screen
          name="Create"
          component={Create}
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
