import React from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";

import { styles, buttons } from "../styles/styleSheets";
import Firebase from "../../config/firebase";
import { HIGHLIGHT_DARK, BACKGROUND } from "../styles/colors";

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");

  const SignUp = async () => {
    try {
      await Firebase.auth().createUserWithEmailAndPassword(email, password);
      await Firebase.auth().currentUser.updateProfile({
        displayName,
        photoURL: `https://avatar.tobi.sh/${email}`,
      });
      await Firebase.firestore()
        .collection("users")
        .doc(Firebase.auth().currentUser.uid)
        .set({
          createdAt: new Date().getTime(),
          email: email,
          displayName: displayName,
          photoURL: `https://avatar.tobi.sh/${email}`,
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
    <View style={signUpStyles.container}>
      <View style={signUpStyles.signUpContainer}>
        <View style={styles.padding}>
          <Text style={styles.header_text}>Sign Up:</Text>
        </View>
        <TextInput
          style={styles.form_text_input}
          onChangeText={(displayName) => setDisplayName(displayName)}
          placeholder="How you wish to be addressed"
        />
        <TextInput
          style={styles.form_text_input}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.form_text_input}
          style={styles.form_text_input}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TouchableOpacity style={buttons.secondary_button} onPress={SignUp}>
          <Text style={buttons.secondary_button_text}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttons.primary_button} onPress={NavToLogin}>
          <Text style={buttons.primary_button_text}>LOG IN</Text>
        </TouchableOpacity>
        <View style={signUpStyles.tosBox}>
          <Text style={signUpStyles.tosText}>
            By continuing you agree to Pushquery's{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TOS");
            }}
          >
            <Text style={signUpStyles.tosLinkText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const signUpStyles = StyleSheet.create({
  signUpContainer: {
    width: "80%",
  },
  tosText: {
    fontSize: 11,
  },
  tosLinkText: {
    fontSize: 11,
    color: HIGHLIGHT_DARK,
  },
  tosBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
});
