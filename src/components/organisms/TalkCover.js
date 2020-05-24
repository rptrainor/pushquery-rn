import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles, talkCover } from "../../styles/styleSheets";

export default function TalkCover({ talk, navigation }) {
  const navToTalk = () => {
    navigation.navigate('Talk', { talk });
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
