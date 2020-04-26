import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Firebase from "../../config/firebase";
import { login } from "../../redux/actions/user";
import { TouchableOpacity } from "react-native-gesture-handler";

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
      <Text>Sign up for Pushquery</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUpModal")}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
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
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#f6820d",
    borderColor: "#f6820d",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
