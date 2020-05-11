import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Firebase from "../../../config/firebase";

export default function LogInModal({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate("Root", { screen: "Me" });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign up for Pushquery</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(email) => setEmail(email)}
        placeholder="klbouman@caltech.edu"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "100%",
    margin: 10,
    padding: 10,
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  header: {
    fontSize: 32,
  },
  button: {
    width: "100%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
});
