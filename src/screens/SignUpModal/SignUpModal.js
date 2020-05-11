import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import md5 from "md5";

import Firebase from "../../../config/firebase";

export default function SignUpModal({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    let trimmedEmail = email.trim();
    let loweredEmail = trimmedEmail.toLowerCase();
    let hashedEmail = md5(loweredEmail);
    let avatar = `https://www.gravatar.com/avatar/${hashedEmail}?d=https%3A%2F%2Fexample.com%2Fimages%2Favatar.jpg`;
    try {
      await Firebase.auth().createUserWithEmailAndPassword(email, password);
      let user = Firebase.auth().currentUser;

      user.updateProfile({
        displayName: name,
        photoURL: avatar,
      });
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
        onChangeText={(name) => setName(name)}
        placeholder="Dr. Bouman, Katherine L."
      />
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SIGN UP</Text>
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
