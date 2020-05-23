import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../scenes/Home";
import Talk from "../scenes/Talk";

const HomeStack = createStackNavigator();

export default function homeNavigator({ route }) {
  console.log({ route });

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <Home {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Talk" options={{ headerShown: false }}>
        {(props) => <Talk {...props} route={route} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}
