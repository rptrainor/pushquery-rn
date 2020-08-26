import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../scenes/Home";
import Talk from "../scenes/Talk";
import {
  BACKGROUND,
  INACTIVE_ICON_GRAY,
  PARAGRAPH_COLOR,
} from "../styles/colors";

const HomeStack = createStackNavigator();

export default function homeNavigator({ route }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: PARAGRAPH_COLOR,
        headerStyle: { backgroundColor: BACKGROUND },
      }}
    >
      <HomeStack.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <Home {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Talk" options={{ headerShown: false }}>
        {(props) => <Talk {...props} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}
