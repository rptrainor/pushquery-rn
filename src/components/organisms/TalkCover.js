import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "../../styles/styleSheets";
import { AuthContext, TalkContext } from "../../../globalState";

export default function TalkCover({ talk, navigation }) {
  const { currentUser } = React.useContext(AuthContext);

  const navToTalk = () => {
    navigation.navigate("Talk", { talk });
  };

  const handleReport = () => {
    if (!currentUser) {
      alert(
        "We are sorry, you will have to log in before you can report or edit a Talk"
      );
      navigation.navigate("Me", { screen: "Log In" });
    } else {
      navigation.navigate("Report", {
        id: talk._id,
        type: "talk",
        displayName: talk.user.displayName,
        userIdToReport: talk.user._id,
      });
    }
  };

  return (
    <View style={talkCover.container}>
      <TouchableOpacity onPress={handleReport}>
        <Entypo
          name="dots-three-vertical"
          size={15}
          color="black"
          style={talkCover.reportBtn}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={navToTalk}>
        <View style={styles.padding}>
          <Text style={styles.header_text} selectable>
            {talk.title}
          </Text>
        </View>
        <Text
          style={styles.paragraph_text}
          numberOfLines={10}
          ellipsizeMode="tail"
          selectable
        >
          {talk.description}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const talkCover = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  reportBtn: {
    display: "flex",
    width: "100%",
    textAlign: "right",
  },
});
