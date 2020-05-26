import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles, buttons } from "../styles/styleSheets";
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
    <View>
      <View style={styles.statusBar} />
      <View style={styles.container}>
        <Text style={styles.paragraph_text}>
          Welcome{" "}
          {currentUser && currentUser.displayName
            ? currentUser.displayName
            : currentUser.email}
        </Text>
        <TouchableOpacity
          style={buttons.primary_button}
          onPress={handleSignOut}
        >
          <Text style={buttons.primary_button_text}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
