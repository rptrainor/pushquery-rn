import React, { useEffect, useContext } from "react";
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { AuthContext } from "../../../../globalState";

import Firebase from "../../../../config/firebase";

export default function HostFooter() {
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  console.log({ currentUser });

  return (
    <View style={styles.container}>
      <FontAwesome5 name="user-astronaut" size={20} style={styles.userAvatar} />
      <View style={styles.textInputContainer}>
        <Text style={styles.userName}>
          {currentUser && currentUser.displayName
            ? currentUser.displayName
            : ""}
        </Text>
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
