import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Firebase from "../../config/firebase";
import { AuthContext } from "../../globalState";

import { styles, buttons } from "../styles/styleSheets";

export default function Create({ navigation }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { currentUser } = React.useContext(AuthContext);

  const createTalk = () => {
    const db = Firebase.firestore();
    if (title.length > 0 && description.length > 0) {
      db.collection("talks")
        .add({
          title,
          description,
          createdBy: currentUser.uid,
          createdOn: new Date().getTime(),
          user: {
            _id: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
        })
        .then(() => {
          setTitle("");
          setDescription("");
          navigation.navigate("Root", { screen: "Home" });
        });
    }
  };

  return (
    <View>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        // keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.statusBarView} />
        <View style={styles.container}>
          <View style={styles.padding}>
            <Text style={styles.header_text}>
              What is the title of your talk?
            </Text>
          </View>
          <TextInput
            style={styles.form_text_input}
            placeholder="title"
            onChangeText={(title) => setTitle(title)}
          />
          <TextInput
            style={styles.form_text_input}
            placeholder="description"
            onChangeText={(description) => setDescription(description)}
          />
          <TouchableOpacity style={buttons.primary_button} onPress={createTalk}>
            <Text style={buttons.primary_button_text}>CREATE</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
