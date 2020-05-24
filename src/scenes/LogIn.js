import React from "react";
import { TextInput, TouchableOpacity, Text, View } from "react-native";

import { styles, buttons } from "../styles/styleSheets";
import Firebase from "../../config/firebase";

export default function LogIn({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const logIn = async () => {
    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate("Root", { screen: "Create" });
    } catch (error) {
      alert(error);
    }
  };

  const NavToSignUp = () => {
    try {
      navigation.navigate("Me", { screen: "Sign Up" });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.padding}>
        <Text style={styles.header_text}>Log In:</Text>
      </View>
      <TextInput
        style={styles.form_text_input}
        onChangeText={(email) => setEmail(email)}
        placeholder="email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.form_text_input}
        style={styles.form_text_input}
        onChangeText={(password) => setPassword(password)}
        placeholder="password"
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <TouchableOpacity style={buttons.secondary_button} onPress={logIn}>
        <Text style={buttons.secondary_button_text}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={buttons.primary_button} onPress={NavToSignUp}>
        <Text style={buttons.primary_button_text}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}
