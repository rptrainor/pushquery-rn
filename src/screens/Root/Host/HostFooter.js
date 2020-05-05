import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import Firebase from "../../../../config/firebase";
import { getUser } from "../../../../redux/actions/user";

export default function HostFooter() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log({ user });

  useEffect(
    () =>
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch(getUser(user.uid));
          if (user != null) {
            navigation.navigate("Root", { screen: "Me" });
          }
        }
      }),
    []
  );

  return (
    <View style={styles.container}>
      <FontAwesome5 name="user-astronaut" size={20} style={styles.userAvatar} />
      <View style={styles.textInputContainer}>
        <Text style={styles.userName}>{user ? user.email : "username"}</Text>
        <TextInput
          placeholder="What would you like to discover?"
          style={styles.textInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  userAvatar: {
    flex: 1,
    margin: 5,
    padding: 5,
  },
  textInputContainer: {
    flex: 10,
  },
  textInput: {
    backgroundColor: "#eee",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  userName: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
