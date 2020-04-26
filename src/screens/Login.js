import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  updateEmail,
  updatePassword,
  login,
  getUser,
} from "../../redux/actions/user";
import Firebase from "../../config/firebase";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const user = useSelector((state) => state.user);

  // gets the login function from actions
  // && navigates to the Profile component if login is successful
  function handleLogin() {
    dispatch(login());
    navigation.navigate("Profile");
  }

  // each time the component mounts
  // we ask Firebase if the auth state has changed
  // if there is a user, we populate the user's UID
  // after the user's UID is populated, we navigate to the Profile component
  useEffect(
    () =>
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch(getUser(user.uid));
          if (user != null) {
            navigation.navigate("Profile");
          }
        }
      }),
    []
  );

  return (
    <View style={styles.container}>
      <Text>Login.js</Text>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={(email) => dispatch(updateEmail(email))}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={(password) => dispatch(updatePassword(password))}
        placeholder="******"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={() => dispatch(login())}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Button
        title="Don't have an account yet? Sign up"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#f6820d",
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
  buttonSignup: {
    fontSize: 12,
  },
});
