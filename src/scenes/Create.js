import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
} from "react-native";
import Firebase from "../../config/firebase";
import { AuthContext } from "../../globalState";

import { styles, buttons } from "../styles/styleSheets";
import { BACKGROUND } from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";

export default function Create({ navigation }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { currentUser, isBlocked } = React.useContext(AuthContext);

  const createTalk = () => {
    const db = Firebase.firestore();
    if (!isBlocked) {
      if (title.length > 0 && description.length > 0) {
        db.collection("talks")
          .add({
            title,
            description,
            createdBy: currentUser.uid,
            createdOn: new Date().getTime(),
            flag: {
              flagged: false,
            },
            user: {
              _id: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
          })
          .then(async (docRef) => {
            await Firebase.firestore()
              .collection("talks")
              .doc(docRef.id)
              .collection("messages")
              .add({
                text: description,
                createdAt: new Date().getTime(),
                flag: {
                  flagged: false,
                },
                user: {
                  _id: currentUser.uid,
                  email: currentUser.email,
                  displayName: currentUser.displayName,
                  photoURL: currentUser.photoURL,
                },
              });
          })
          .then(() => {
            setTitle("");
            setDescription("");
            navigation.navigate("Home", { screen: "Home" });
          });
      }
    } else {
      alert(
        "We are sorry, one of your posts has been flagged by our community. We are in the process of reviewing this flag, but until then you will not be allowed to host a Talk.  We appreciate your patience and will email you with more details about this review shortly. Thank you"
      );
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={createStyles.container}>
      <TouchableOpacity
        onPress={() => {navigation.goBack()}}
        style={{ width: "100%", height: "10%", marginTop: 10}}
      >
        <Ionicons
          name="ios-arrow-back"
          size={30}
          color="black"
          style={createStyles.backBtn}
        />
      </TouchableOpacity>
      <View style={{ width: "90%" }}>
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
          multiline
          numberOfLines={8}
        />
        <TouchableOpacity style={buttons.primary_button} onPress={createTalk}>
          <Text style={buttons.primary_button_text}>CREATE</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const createStyles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    // height: "100%",
  },
  backBtn: {
    padding: 10,
    textAlign: "left",
    width: "100%",
    backgroundColor: BACKGROUND,
  },
});
