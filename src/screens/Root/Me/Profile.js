import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { AuthContext } from "../../../../globalState";
import Firebase from "../../../../config/firebase";

import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile({ navigation }) {
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  // Firebase signs the user out
  // && then navigates back to the Login screen
  function handleSignOut() {
    Firebase.auth().signOut();
    navigation.reset({
      routes: [{ name: "Root" }],
    });
  }

  return (
    <>
      { currentUser != null ? (
        <View style={styles.container}>
          <Text>
            Welcome {currentUser && currentUser.email ? currentUser.email : ""}
          </Text>
          <Button title="Logout" onPress={handleSignOut} />
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("LogInModal")}
          >
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("SignUpModal")}
          >
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
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
    backgroundColor: "gray",
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
