import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// CONFIG IMPORTS
import { AuthContext } from "../../../globalState";
import Firebase from "../../../config/firebase";
// CSS IMPORTS
import { SlideShowCSS } from "../../styles/styleSheets";

export default function TalkIconBox({ navigation, NextTalk, talk, send }) {
  const { currentUser } = React.useContext(AuthContext);

  const navToTalk = () => {
    navigation.navigate("Talk", { talk });
  };
  function alertWithUrlForSharing() {
    alert(`You can copy and share this Talk's URL shown below:
    https://pushquery.com/talk/${talk.id}`);
    send("PAUSE");
  }

  function followThisUser() {
    alert(`You have followed ${talk.user.displayName}`);
    send("PAUSE");
  }
  const handleReport = async () => {
    if (!currentUser) {
      alert(
        "We are sorry, you will have to log in before you can report a Talk"
      );
      navigation.navigate("Me", { screen: "Log In" });
    } else {
      await Firebase.firestore()
        .collection("talks")
        .doc(talk.id)
        .update({
          flag: {
            flagged: true,
            reportedAt: new Date().getTime(),
            userWhoFiledComplaint: {
              _id: currentUser.uid,
            },
          },
        })
        .then(NextTalk());
      alert("We have reported this Talk for you");
    }
  };

  return (
    <View style={SlideShowCSS.iconBox}>
      <TouchableOpacity onPress={navToTalk}>
        <AntDesign name="message1" size={40} color="#fff" />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={followThisUser}>
        <AntDesign name="adduser" size={40} color="#fff" />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={handleReport}>
        <AntDesign name="flag" size={40} color="#fff" />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={alertWithUrlForSharing}>
        <AntDesign name="sharealt" size={40} color="#fff" />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={NextTalk}>
        <AntDesign name="forward" size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
