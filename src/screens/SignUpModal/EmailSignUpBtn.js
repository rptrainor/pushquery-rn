import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function EmailSignUpBtn({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("Email Sign Up")}
    >
      <Text style={styles.buttonText}>Continue with email</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
    padding: 10,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#FFA611",
    borderColor: "#FFA611",
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
