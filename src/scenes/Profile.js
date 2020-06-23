import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { styles, buttons } from "../styles/styleSheets";
import { BACKGROUND } from "../styles/colors";
import { AuthContext } from "../../globalState";
import Firebase from "../../config/firebase";

import LogIn from "./LogIn";

export default function Profile({ navigation }) {
  const { currentUser } = React.useContext(AuthContext);

  const handleSignOut = async () => {
    await Firebase.auth().signOut();
    await navigation.navigate("Home", {
      screen: "Home",
    });
  };

  if (!currentUser) return <LogIn />;
  return (
    <View style={profileStyles.container}>
      <Text style={styles.header_text}>
        Welcome{" "}
        {currentUser && currentUser.displayName
          ? currentUser.displayName
          : currentUser.email}
        ,
      </Text>
      <Text style={styles.header_text}>Would you like to Log Out?</Text>
      <TouchableOpacity
        style={[buttons.primary_button, profileStyles.profileContainer]}
        onPress={handleSignOut}
      >
        <Text style={buttons.primary_button_text}>YES</Text>
      </TouchableOpacity>
    </View>
  );
}

const profileStyles = StyleSheet.create({
  profileContainer: {
    width: "80%",
  },
  container: {
    display: "flex",
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    backgroundColor: BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
  },
});
