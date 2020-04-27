import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import EmailSignUpBtn from "./EmailSignUpBtn";

export default function SignUpModal({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dismissButton}
        onPress={() => navigation.navigate("Root", { screen: "Me" })}
      >
        <Text style={styles.dismissText}>X</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Text style={styles.SignUpText}>Sign up for Pushquery</Text>
        <EmailSignUpBtn navigation={navigation} />
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("LogInModal")}
      >
        <Text style={styles.loginText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  dismissButton: {
    marginTop: 40,
    marginBottom: 80,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "yellow",
    width: 100,
    height: 100,
  },
  dismissText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  SignUpText: {
    backgroundColor: "#fff",
    fontSize: 20,
    margin: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center"
  },
  buttonContainer: {
    flex: 4,
    alignSelf: "center",
    justifyContent: "flex-start",
    // backgroundColor: "red",
  },
  loginButton: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
  loginText: {
    color: "#fff",
    padding: 15,
    margin: 15,
    fontSize: 16,
  }
});
