import React from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Button,
} from "react-native";

import { styles, buttons } from "../styles/styleSheets";
import { HIGHLIGHT_DARK, BACKGROUND } from "../styles/colors";
import Firebase from "../../config/firebase";

export default function LogIn({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const logIn = async () => {
    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate("Home", { screen: "Home" });
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
    <View style={logInStyles.container}>
      <View style={logInStyles.logInContainer}>
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
        <View style={logInStyles.tosBox}>
          <Text style={logInStyles.tosText}>
            By continuing you agree to Pushquery's{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TOS");
            }}
          >
            <Text style={logInStyles.tosLinkText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const logInStyles = StyleSheet.create({
  logInContainer: {
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
    // marginTop: Constants.statusBarHeight,
    backgroundColor: BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
  },
});
