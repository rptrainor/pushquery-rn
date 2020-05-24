import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import { AuthContext } from "../../globalState";
import { BACKGROUND } from "../styles/colors";
import Firebase from "../../config/firebase";
import SendMsgInput from "../components/organisms/SendMsgInput";

export default function Talk({ navigation, route }) {
  const { currentUser } = React.useContext(AuthContext);
  const [messages, setMessages] = React.useState([]);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 20 : 0;

  const talkId = route.params.talk._id;
  React.useEffect(() => {
    console.log({ talkId });

    const messageListener = Firebase.firestore()
      .collection("talks")
      .doc(talkId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              // email: firebaseData.user.email,
            };
          }

          return data;
        });

        setMessages(messages);
      });
    return () => messageListener();
  }, []);

  const handleMsgSend = (messages) => {
    const text = messages[0].text;

    Firebase.firestore()
      .collection("talks")
      .doc(talkId)
      .collection("messages")
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          // email: currentUser.email,
        },
      });
  };

  const returnToMainHome = () => {
    navigation.navigate("Home", {
      screen: "Home",
    });
  };
  return (
    <View style={talkStyles.container}>
      <TouchableOpacity style={talkStyles.backBtn} onPress={returnToMainHome}>
        <Ionicons name="ios-arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item.text}</Text>}
        keyExtractor={(item) => item._id}
        style={talkStyles.flatList}
      />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <SendMsgInput currentUser={currentUser} handleMsgSend={handleMsgSend} />
      </KeyboardAvoidingView>
    </View>
  );
}

const talkStyles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
  },
  flatList: {
    width: "100%",
  },
  backBtn: {
    width: "90%",
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
  },
});
