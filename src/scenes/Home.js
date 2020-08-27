import React from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

// CONFIG IMPORTS
import firebase from "../../config/firebase";

// COMPONENT IMPORTS
import TalkCover from "../components/organisms/TalkCover";
import SpinLoader from "../components/atoms/SpinLoader";
// STYLE SHEET IMPORTS

export default function Home({ navigation, route }) {
  const [talks, setTalks] = React.useState([]);
  const [lastDoc, setLastDoc] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [isMoreLoading, setIsMoreLoading] = React.useState(false);
  const [currentTalkIndex, setCurrentTalkIndex] = React.useState(0);

  const talksRef = firebase.firestore().collection("talks");

  // pulling the talks from Firebase
  React.useEffect(() => {
    getTalks();
  }, []);

  const getTalks = async () => {
    setLoading(true);

    const snapshot = await talksRef.orderBy("id").limit(1).get();

    if (!snapshot.empty) {
      let newTalks = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        newTalks.push(snapshot.docs[i].data());
      }

      setTalks(newTalks);
    } else {
      setLastDoc(null);
    }

    setLoading(false);
  };

  const NextTalk = async () => {
    // if (!talks[currentTalkIndex]) {
    //   setCurrentTalkIndex(0);
    //   console.log("RESET INDEX");
    // }
    if (lastDoc) {
      setIsMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await talksRef
          .orderBy("id")
          .startAfter(lastDoc.data().id)
          .limit(1)
          .get();

        if (!snapshot.empty) {
          let newTalks = talks;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            newTalks.push(snapshot.docs[i].data());
          }

          setTalks(newTalks);
          setCurrentTalkIndex(currentTalkIndex + 1);
          if (snapshot.docs.length < 1) setLastDoc(null);
        } else {
          setCurrentTalkIndex(0);
          setTalks([]);
          getTalks();
          // setLastDoc(null);
        }

        setIsMoreLoading(false);
      }, 1000);
    }
  };

  // console.log({
  //   talks,
  //   currentTalkIndex,
  // });

  if (loading || isMoreLoading || !talks) return <SpinLoader />;
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <StatusBar hidden={true} />
      <TalkCover
        id={talks[currentTalkIndex].id}
        slides={talks[currentTalkIndex].slides}
        user={talks[currentTalkIndex].user}
        navigation={navigation}
        route={route}
        talk={talks[currentTalkIndex]}
        NextTalk={NextTalk}
      />
    </View>
  );
}
