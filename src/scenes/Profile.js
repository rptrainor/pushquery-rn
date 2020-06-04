import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
        <View style={profileStyles.profileContainer}>
          <Text style={styles.header_text}>
            Welcome{" "}
            {currentUser && currentUser.displayName
              ? currentUser.displayName
              : currentUser.email}
            ,
          </Text>
          <Text style={styles.header_text}>Would you like to Log Out?</Text>
          <TouchableOpacity
            style={buttons.primary_button}
            onPress={handleSignOut}
          >
            <Text style={buttons.primary_button_text}>YES</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const profileStyles = StyleSheet.create({
  profileContainer: {
    width: "80%",
  },
});
