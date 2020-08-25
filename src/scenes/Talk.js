import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  SafeAreaView
} from "react-native";

import { AuthContext } from "../../globalState";
import {
  BACKGROUND,
  PRIMARY,
  WHITE,
  BUTTON_TEXT_INPUTS,
} from "../styles/colors";
import Firebase from "../../config/firebase";
import TalkMsg from "../components/organisms/TalkMsg";

export default function Talk({ navigation, route }) {
  const { currentUser, isBlocked } = React.useContext(AuthContext);
  const [messages, setMessages] = React.useState([]);
  const [inputText, setInputText] = React.useState("");
  const [focused, setFocused] = React.useState(false);

  const talkId = route.params.talk.id;

  React.useEffect(() => {
    const messageListener = Firebase.firestore()
      .collection("talks")
      .doc(talkId)
      .collection("messages")
      .where("flag.flagged", "==", false)
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            flag: {
              flagged: false,
            },
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
    if (!isBlocked) {
      if (inputText.length > 0) {
        if (currentUser) {
          setFocused(false);
          await Firebase.firestore()
            .collection("talks")
            .doc(talkId)
            .collection("messages")
            .add({
              text,
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
          await setInputText("");
        } else {
          alert("You Me Be Logged In To Comment");
          navigation.navigate("Me");
        }
      } else {
        alert("Please Type A Comment Before Pressing Send");
      }
    } else {
      alert(
        "We are sorry, one of your posts has been flagged by our community. We are in the process of reviewing this flag, but until then you will not be allowed to ask a question.  We appreciate your patience and will email you with more details about this review shortly. Thank you"
      );
    }
  };

  const returnToMainHome = () => {
    navigation.navigate("Home", {
      screen: "Home",
    });
  };
  console.log(Platform.OS);

  if (!messages) return <Text>loading...</Text>;
  return (
    <SafeAreaView>
      <Text>Talk.js</Text>
    </SafeAreaView>
    // <KeyboardAvoidingView
    //   behavior={Platform.OS == "ios" ? "position" : "position"}
    //   keyboardVerticalOffset={80}
    //   style={talkStyles.container}
    // >
    //   <Text style={talkStyles.title}>
    //     {route.params.talk.title.length > 90
    //       ? `${route.params.talk.title.slice(0, 90)}...`
    //       : route.params.talk.title}
    //   </Text>
    //   <FlatList
    //     style={focused ? talkStyles.flatlistFocused : talkStyles.flatlist}
    //     data={messages}
    //     keyExtractor={(item) => item._id}
    //     renderItem={({ item, index }) => (
    //       <TalkMsg
    //         navigation={navigation}
    //         Index={index}
    //         item={item}
    //         talkId={talkId}
    //       />
    //     )}
    //     ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
    //     contentContainerStyle={{ paddingBottom: 20 }}
    //   />
    //   <TextInput
    //     style={focused ? talkStyles.textInputFocused : talkStyles.textInput}
    //     onChangeText={(inputText) => setInputText(inputText)}
    //     value={inputText}
    //     clearButtonMode="always"
    //     multiline={true}
    //     numberOfLines={5}
    //     enablesReturnKeyAutomatically
    //     placeholder="What are you curious about?"
    //     onFocus={() => setFocused(true)}
    //     onBlur={() => setFocused(false)}
    //   />
    //   <TouchableOpacity
    //     style={focused ? talkStyles.buttonFocused : talkStyles.button}
    //     onPress={handleMsgSend}
    //   >
    //     <Text style={talkStyles.buttonText}>SEND</Text>
    //   </TouchableOpacity>
    // </KeyboardAvoidingView>
  );
}

const talkStyles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: BACKGROUND,
  },
  title: {
    height: "13%",
    flexWrap: "wrap",
    backgroundColor: BACKGROUND,
    fontFamily: "Lato",
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 7,
    paddingVertical: 10,
    color: PRIMARY,
  },
  flatlist: {
    height: "70%",
    backgroundColor: BACKGROUND,
  },
  flatlistFocused: {
    height: "50%",
    backgroundColor: BACKGROUND,
  },
  textInput: {
    height: "8%",
    position: "relative",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: WHITE,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  },
  textInputFocused: {
    height: "25%",
    position: "relative",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: WHITE,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: PRIMARY,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 2,
    height: "5%",
  },
  buttonFocused: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: PRIMARY,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 2,
    height: "8%",
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
