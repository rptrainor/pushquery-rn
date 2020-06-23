import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Firebase from "../../config/firebase";
import { AuthContext } from "../../globalState";

import { styles, buttons } from "../styles/styleSheets";
import { BACKGROUND } from '../styles/colors'
import { FlatList } from "react-native-gesture-handler";

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
    <View  style={createStyles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        // keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.statusBarView} />
        <View>
          <View>
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
              numberOfLines={20}
            />
            <TouchableOpacity
              style={buttons.primary_button}
              onPress={createTalk}
            >
              <Text style={buttons.primary_button_text}>CREATE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const createStyles = StyleSheet.create({
  createContainer: {
    width: "80%",
  },
  container: {
    display: "flex",
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    backgroundColor: BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
  },
});
