import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
// CONFIG IMPORTS
import { AuthContext } from "../../globalState";
import Firebase from "../../config/firebase";
// COMPONENT IMPORTS
import SingleComment from "../components/organisms/SingleComment";
import SingleTalkSlideShow from "../components/molecules/SingleTalkSlideShow";
// STYLESHEET IMPORTS
import {
  BACKGROUND,
  PRIMARY,
  WHITE,
  SECONDARY,
  SECONDARY_DARK,
} from "../styles/colors";
import { BUTTON_TEXT_INPUTS } from "../styles/typography";
import { SlideShowCSS } from "../styles/styleSheets";
import ReviewIconBox from "../components/molecules/ReviewIconBox";

export default function Talk({ navigation, route }) {
  const [messages, setMessages] = React.useState([]);
  const [talk, setTalk] = React.useState({});
  const [inputText, setInputText] = React.useState("");
  const [showSlideShow, setShowSlideShow] = React.useState(false);
  const { currentUser, isBlocked } = React.useContext(AuthContext);
  const [focused, setFocused] = React.useState(false);

  const talkId = route.params.talk.id;

  // function that pulls the Talk from Firestore
  // And listens for any messages
  React.useEffect(() => {
    if (!talkId) return undefined;
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

    // pulls the talk from Firestore
    Firebase.firestore()
      .collection("talks")
      .doc(talkId)
      .get()
      .then((doc) => setTalk(doc.data()));

    return () => messageListener();
  }, [talkId]);

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
  // console.log(Platform.OS);
  // console.log(messages);
  const toggleShowSlideShow = () => setShowSlideShow(!showSlideShow);
  // console.log(talk);
  // WAITING FOR MESSAGE AND USER TO LOAD
  if (!messages) return <SpinLoader />;
  if (showSlideShow)
    return (
      <SingleTalkSlideShow
        slides={talk.slides}
        showSlideShow={showSlideShow}
        toggleShowSlideShow={toggleShowSlideShow}
      />
    );
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: PRIMARY }} />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View
              style={{ width: "100%", flex: 1.3, backgroundColor: PRIMARY }}
            >
              <ReviewIconBox
                showSlideShow={showSlideShow}
                toggleShowSlideShow={toggleShowSlideShow}
              />
            </View>
            <View
              style={[
                focused
                  ? talkStyles.flatListGroupFocus
                  : talkStyles.flatListGroupNoFocus,
              ]}
            >
              <FlatList
                data={messages}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                  <SingleComment
                    message={item}
                    key={index}
                    user={currentUser}
                  />
                )}
                ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
                contentContainerStyle={{ paddingBottom: 10 }}
              />
            </View>
            <View
              style={[
                focused
                  ? talkStyles.inputGroupFocus
                  : talkStyles.inputGroupNoFocus,
              ]}
            >
              <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <TextInput
                  placeholder="What are your curious about?"
                  onChangeText={(event) => setInputText(event)}
                  value={inputText}
                  multiline={true}
                  numberOfLines={5}
                  style={{
                    minHeight: 30,
                    width: "95%",
                    backgroundColor: "#fff",
                    flex: 8,
                    paddingHorizontal: 5,
                    margin: 10,
                    borderRadius: 10,
                    marginRight: 5,
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
                <TouchableOpacity
                  style={{
                    minHeight: 20,
                    width: "95%",
                    backgroundColor: SECONDARY,
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10,
                    borderRadius: 10,
                    marginLeft: 5,
                  }}
                  onPress={handleMsgSend}
                >
                  <Text style={talkStyles.buttonText}>SEND</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

const talkStyles = StyleSheet.create({
  buttonText: {
    fontSize: BUTTON_TEXT_INPUTS,
    color: WHITE,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Lato",
  },
  inputGroupNoFocus: { width: "100%", backgroundColor: PRIMARY, flex: 1 },
  inputGroupFocus: { width: "100%", backgroundColor: PRIMARY, flex: 3 },
  flatListGroupNoFocus: { width: "100%", backgroundColor: PRIMARY, flex: 8 },
  flatListGroupFocus: { width: "100%", backgroundColor: PRIMARY, flex: 7 },
});
