import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// CSS IMPORTS
import { SlideShowCSS } from "../../styles/styleSheets";

export default function TalkIconBox({ navigation, NextTalk, talk, send }) {
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
  //   console.log(talk);
  return (
    <View style={SlideShowCSS.iconBox}>
      <TouchableOpacity onPress={navToTalk}>
        <AntDesign name="message1" size={40} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={followThisUser}>
        <AntDesign name="adduser" size={40} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={alertWithUrlForSharing}>
        <AntDesign name="sharealt" size={40} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={NextTalk}>
        <AntDesign name="forward" size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
