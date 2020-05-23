import React from "react";
import { TextInput, TouchableOpacity, Text, View } from "react-native";

import { styles, buttons } from "../styles/styleSheets";
import Firebase from "../../config/firebase";

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const SignUp = async () => {
    try {
      await Firebase.auth().createUserWithEmailAndPassword(email, password);
      navigation.navigate("Root", { screen: "Create" });
    } catch (error) {
      alert(error);
    }
  };

  const NavToLogin = () => {
    try {
      navigation.navigate("Me", { screen: "Log In" });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.padding}>
        <Text style={styles.header_text}>Sign Up:</Text>
      </View>
      <TextInput
        style={styles.form_text_input}
        onChangeText={(email) => setEmail(email)}
        placeholder="email"
      />
      <TextInput
        style={styles.form_text_input}
        style={styles.form_text_input}
        onChangeText={(password) => setPassword(password)}
        placeholder="password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={buttons.secondary_button} onPress={SignUp}>
        <Text style={buttons.secondary_button_text}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={buttons.primary_button} onPress={NavToLogin}>
        <Text style={buttons.primary_button_text}>LOG IN</Text>
      </TouchableOpacity>
    </View>
  );
}
