import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import { SplashScreen } from "expo";

// ContectProvider
import { ContextProvider } from "./globalState/providerCompose";

// importing components
import tabNavigator from "./src/navigations/tabNavigator";
import SignUp from "./src/scenes/SignUp";
import LogIn from "./src/scenes/LogIn";
import Talk from "./src/scenes/Talk";
import Report from "./src/scenes/Report";
import TOS from "./src/scenes/TOS";

// creating the navigator to swtich between screens
const RootStack = createStackNavigator();

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // load fonts
        await Font.loadAsync({
          Lato: require("./assets/fonts/Lato-Bold.ttf"),
          OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete) {
    console.log("not complete");
    return null;
  } else {
    console.log("complete");
  }
  return (
    <ContextProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Root">
          <RootStack.Screen
            name="Root"
            component={tabNavigator}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Sign Up"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Log In"
            component={LogIn}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Talk"
            component={Talk}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Report"
            component={Report}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="TOS"
            component={TOS}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
