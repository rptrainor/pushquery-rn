import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Firebase from "../../config/firebase";
import { login } from "../../redux/actions/user";

export default function Profile({ navigation }) {
  const user = useSelector((state) => state.user);

  // Firebase signs the user out
  // && then navigates back to the Login screen
  function handleSignOut() {
    Firebase.auth().signOut();
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Text>Profile.js</Text>
      <Text>Welcome {user ? user.email : ""}</Text>
      <Button title="Logout" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
