import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// importing the combined reducer
import reducer from "./redux/reducers";

// importing components
import Home from "./src/screens/Home";
import BottomTabNavigator from './src/navigation/BottomTabNavigator'


// creating the navigator to swtich between screens
const Stack = createStackNavigator();
// applying middleware to handle async redux requests
const middleware = applyMiddleware(thunkMiddleware);
// creating the store with combined reducer and async middleware for redux
const store = createStore(reducer, middleware);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Root">
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
