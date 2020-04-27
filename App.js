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
import tabNavigator from "./src/screens/Root/tabNavigator";
import SignUpModal from "./src/screens/SignUpModal/SignUpModal";
import LogInModal from "./src/screens/LogInModal/LogInModal";
import EmailSignUpNavigator from "./src/screens/EmailSignUpModal/EmailSignUpNavigator";
import EmailLogInNavigator from "./src/screens/EmailLogInModal/EmailLogInNavigator";

// creating the navigator to swtich between screens
const RootStack = createStackNavigator();
// applying middleware to handle async redux requests
const middleware = applyMiddleware(thunkMiddleware);
// creating the store with combined reducer and async middleware for redux
const store = createStore(reducer, middleware);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Root">
          <RootStack.Screen
            name="Root"
            component={tabNavigator}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="SignUpModal"
            component={SignUpModal}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="LogInModal"
            component={LogInModal}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Email Sign Up"
            component={EmailSignUpNavigator}
          />
          <RootStack.Screen
            name="Email Log In"
            component={EmailLogInNavigator}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
