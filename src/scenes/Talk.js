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
import formatDistance from "date-fns/formatDistance";

import { AuthContext } from "../../globalState";
import { BACKGROUND, PRIMARY } from "../styles/colors";
import Firebase from "../../config/firebase";
import SendMsgInput from "../components/organisms/SendMsgInput";
import TalkMsg from "../components/organisms/TalkMsg";

export default function Talk({ navigation, route }) {
  const { currentUser } = React.useContext(AuthContext);
  const [messages, setMessages] = React.useState([]);
  const [inputText, setInputText] = React.useState("");

  const keyboardVerticalOffset = Platform.OS === "ios" ? 20 : 0;

  const talkId = route.params.talk._id;

  const talkDescription = route.params.talk.description;
  const talkCreatedAt = route.params.talk.createdOn;
  const howLongAgo = formatDistance(Date.now(), talkCreatedAt, []);
  // console.log({ howLongAgo });

  React.useEffect(() => {
    const messageListener = Firebase.firestore()
      .collection("talks")
      .doc(talkId)
      .collection("messages")
      .orderBy("createdAt", "asc")
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
              email: firebaseData.user.email,
              displayName: firebaseData.user.displayName,
            };
          }

          return data;
        });

        setMessages(messages);
      });
    return () => messageListener();
  }, []);

  const handleMsgSend = async () => {
    const text = inputText;

    await Firebase.firestore()
      .collection("talks")
      .doc(talkId)
      .collection("messages")
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        },
      });

    await setInputText("");
  };

  const returnToMainHome = () => {
    navigation.navigate("Home", {
      screen: "Home",
    });
  };
  return (
    <View style={talkStyles.container}>
      <View style={talkStyles.backBtn}>
        <TouchableOpacity style={talkStyles.backBtn} onPress={returnToMainHome}>
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={talkStyles.title}>{route.params.talk.title}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TalkMsg item={item} />}
      />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <SendMsgInput
          currentUser={currentUser}
          handleMsgSend={handleMsgSend}
          setInputText={setInputText}
          inputText={inputText}
        />
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
    backgroundColor: "#F2EEE4",
  },
  backBtn: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 5,
    paddingHorizontal: 3,
  },
  title: {
    fontFamily: "Lato",
    fontWeight: "bold",
    fontSize: 17,
    flexWrap: "wrap",
    marginHorizontal: 5,
    paddingHorizontal: 3,
    color: PRIMARY,
  },
});
