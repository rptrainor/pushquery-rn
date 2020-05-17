import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import Firebase from "../../config/firebase";

import { styles, buttons } from "../styles/styleSheets";

export default function Create() {
  const [title, setTitle] = React.useState("");

  const createTalk = () => {
    const db = Firebase.firestore();
    db.collection("talks").doc("talk").set({ title: title });
    console.log("talk added");
    setTitle("")
  };

  return (
    <View style={styles.container}>
      <View style={styles.padding}>
        <Text style={styles.header_text}>What is the title of your talk?</Text>
      </View>
      <TextInput
        style={styles.form_text_input}
        placeholder="title"
        onChangeText={(title) => setTitle(title)}
      />
      <TouchableOpacity style={buttons.primary_button} onPress={createTalk}>
        <Text style={buttons.primary_button_text}>CREATE</Text>
      </TouchableOpacity>
    </View>
  );
}
