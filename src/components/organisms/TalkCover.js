import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "../../styles/styleSheets";

export default function TalkCover({ talk, navigation }) {
  const navToTalk = () => {
    navigation.navigate("Talk", { talk });
  };

  return (
    <View style={talkCover.container}>
      <TouchableOpacity onPress={navToTalk}>
        <View style={styles.padding}>
          <Text style={styles.header_text}>{talk.title}</Text>
        </View>
        <Text style={styles.paragraph_text}>{talk.description}</Text>
      </TouchableOpacity>
    </View>
  );
}

const talkCover = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {},
});
