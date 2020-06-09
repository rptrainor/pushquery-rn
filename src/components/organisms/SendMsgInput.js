import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PRIMARY, WHITE } from "../../styles/colors";
import { BUTTON_TEXT_INPUTS } from "../../styles/typography";

export default function SendMsgInput({
  handleMsgSend,
  setInputText,
  inputText,
}) {
  const [inputHeight, setInputHeight] = React.useState(45);

  return (
    <View style={[sendMsgStyles.container, { height: inputHeight * 1.2 }]}>
      <View style={sendMsgStyles.textInputContainer}>
        <TextInput
          style={[sendMsgStyles.textInput, { height: inputHeight }]}
          placeholder="What would you like to discover?"
          onChangeText={(inputText) => setInputText(inputText)}
          value={inputText}
          clearButtonMode="always"
          multiline={true}
          numberOfLines={5}
          onFocus={() => {
            setInputHeight(90);
            console.log("focused");
          }}
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
    fontSize: 16,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    marginVertical: 10,
    paddingVertical: 7,
  },
  userName: {},
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: PRIMARY,
    marginHorizontal: 5,
    marginVertical: 10,
    paddingVertical: 2,
    height: "80%"
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
