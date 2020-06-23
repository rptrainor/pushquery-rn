import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  SectionList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import { AuthContext } from "../../globalState";
import { BACKGROUND, PRIMARY } from "../styles/colors";
import Firebase from "../../config/firebase";
import SendMsgInput from "../components/organisms/SendMsgInput";
import TalkMsg from "../components/organisms/TalkMsg";

export default function Talk({ navigation, route }) {
  const { currentUser, isBlocked } = React.useContext(AuthContext);
  const [messages, setMessages] = React.useState([]);
  const [inputText, setInputText] = React.useState("");

  const talkId = route.params.talk._id;

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
  console.log(messages);

  if (!messages) return <Text>loading...</Text>;
  return (
    <SafeAreaView style={talkStyles.container}>
      <View style={talkStyles.statusBarView} />
      <View style={talkStyles.backBtnBox}>
        <Text style={talkStyles.title}>{route.params.talk.title}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        // style={[
        //   talkStyles.item,
        //   { backgroundColor: '#6e3b6e' },
        // ]}
        renderItem={({ item, index }) => (
          <TalkMsg
            navigation={navigation}
            Index={index}
            item={item}
            talkId={talkId}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
      <KeyboardAvoidingView behavior="padding" enabled>
      <SendMsgInput
          currentUser={currentUser}
          handleMsgSend={handleMsgSend}
          setInputText={setInputText}
          inputText={inputText}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const talkStyles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    flex: 2
  },
  item: {
    flexGrow: 1,
    paddingBottom: 180,
  },
  backBtnBox: {
    marginTop: 5,
    marginLeft: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginHorizontal: 5,
    paddingHorizontal: 3,
  },
  backBtn: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  title: {
    fontFamily: "Lato",
    fontWeight: "bold",
    fontSize: 17,
    flexWrap: "wrap",
    marginHorizontal: 5,
    paddingHorizontal: 3,
    marginBottom: 5,
    color: PRIMARY,
  },
  statusBarView: {
    height: Constants.statusBarHeight,
    backgroundColor: BACKGROUND,
    width: "100%",
  },
});
