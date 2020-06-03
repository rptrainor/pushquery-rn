import React from "react";
import { TextInput, TouchableOpacity, Text, View } from "react-native";

import { styles, buttons } from "../styles/styleSheets";
import Firebase from "../../config/firebase";
import { PRIMARY } from "../styles/colors";

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");

  const SignUp = async () => {
    try {
      const { uid } = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );
      await Firebase.auth().currentUser.updateProfile({
        displayName,
        photoURL:
          "https://res.cloudinary.com/dx35aw3ub/image/upload/v1591064978/icon_prufa1.png",
      });
      await Firebase.firestore()
        .collection("users")
        .doc(Firebase.auth().currentUser.uid)
        .set({
          createdAt: new Date().getTime(),
          email: Firebase.auth().currentUser.email,
          displayName: Firebase.auth().currentUser.displayName,
          photoURL: Firebase.auth().currentUser.photoURL,
          flag: {
            flagged: false,
          },
        });
      await navigation.navigate("Root", { screen: "Create" });
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
        autoCapitalize="none"
      />
      <TextInput
        style={styles.form_text_input}
        onChangeText={(displayName) => setDisplayName(displayName)}
        placeholder="display name"
      />
      <TextInput
        style={styles.form_text_input}
        style={styles.form_text_input}
        onChangeText={(password) => setPassword(password)}
        placeholder="password"
        secureTextEntry={true}
        autoCapitalize="none"
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
