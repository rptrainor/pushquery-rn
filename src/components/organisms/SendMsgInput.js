import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PRIMARY, WHITE } from "../../styles/colors";
import { BUTTON_TEXT_INPUTS } from "../../styles/typography";

export default function SendMsgInput({ currentUser, handleMsgSend }) {
  console.log({ currentUser });

  return (
    <View style={sendMsgStyles.container}>
      <FontAwesome5
        name="user-astronaut"
        size={17}
        style={sendMsgStyles.userAvatar}
      />
      <View style={sendMsgStyles.textInputContainer}>
        <Text style={sendMsgStyles.userName}>
          {currentUser && currentUser.displayName
            ? currentUser.displayName
            : ""}
        </Text>
        <TextInput
          style={sendMsgStyles.textInput}
          placeholder="What would you like to discover?"
        />
      </View>
      <TouchableOpacity style={sendMsgStyles.button} onPress={handleMsgSend}>
        <Text style={sendMsgStyles.buttonText}>SEND</Text>
      </TouchableOpacity>
    </View>
  );
}

export const sendMsgStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
    height: 60,
  },
  userAvatar: {
    textAlign: "right",
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  textInputContainer: {
    flex: 2,
  },
  textInput: {
    backgroundColor: "#eee",
    borderRadius: 10,
    fontSize: 17,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  userName: {},
  button: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: PRIMARY,
    marginHorizontal: 5,
    marginVertical: 10,
    paddingVertical: 2,
  },
  buttonText: {
    fontSize: BUTTON_TEXT_INPUTS,
    color: WHITE,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Lato",
    padding: 5,
  },
});
