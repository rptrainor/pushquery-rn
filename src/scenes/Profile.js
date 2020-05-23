import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles, buttons } from "../styles/styleSheets";
import { AuthContext } from "../../globalState";
import Firebase from "../../config/firebase";

import LogIn from "./LogIn";

export default function Profile({ navigation }) {
  const { currentUser } = React.useContext(AuthContext);
  console.log({ currentUser });

  const handleSignOut = () => {
    Firebase.auth().signOut();
    navigation.reset({
      routes: [{ name: "Root" }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph_text}>
        Welcome{" "}
        {currentUser && currentUser.displayName ? currentUser.displayName : currentUser.email}
      </Text>
      <TouchableOpacity style={buttons.primary_button} onPress={handleSignOut}>
        <Text style={buttons.primary_button_text}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}
