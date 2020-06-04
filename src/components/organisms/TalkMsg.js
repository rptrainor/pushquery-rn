import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import formatDistance from "date-fns/formatDistance";
import { Entypo } from "@expo/vector-icons";
import { PRIMARY, GRAY_DARK } from "../../styles/colors";
import { AuthContext } from "../../../globalState";

export default function TalkMsg({ item, navigation, talkId }) {
  const { currentUser } = React.useContext(AuthContext);
  const msgCreatedAt = item.createdAt;
  const howLongAgo = formatDistance(Date.now(), msgCreatedAt, []);

  const handleReport = () => {
    if (!currentUser) {
      alert(
        "We are sorry, you will have to log in before you can report or edit a Query"
      );
      navigation.navigate("Me", { screen: "Log In" });
    } else {
      navigation.navigate("Report", {
        id: item._id,
        type: "comment",
        displayName: item.user.displayName,
        userIdToReport: item.user._id,
        talkId,
      });
    }
  };
  
  return (
    <View style={msgStyles.container}>
      <Image
        source={{
          uri: item.user.photoURL,
        }}
        style={msgStyles.avatar}
      />
      <View style={msgStyles.msgBox}>
        <View style={msgStyles.msgDetailBox}>
          <View style={msgStyles.msgDetailUsernameAndHowLongAgo}>
            <Text style={msgStyles.username}>
              {item.user.displayName ? item.user.displayName : item.user.email}
              {"  "}
            </Text>
            <Text style={msgStyles.time}>{howLongAgo}</Text>
          </View>

          <TouchableOpacity onPress={handleReport}>
            <Entypo name="dots-three-vertical" size={15} color="black" />
          </TouchableOpacity>
        </View>

        <Text>{item.text}</Text>
      </View>
    </View>
  );
}

const msgStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  msgBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
    marginVertical: 5,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  avatar: {
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 50,
    width: 20,
    height: 20,
  },
  username: {
    color: PRIMARY,
    fontWeight: "bold",
  },
  time: {
    color: GRAY_DARK,
  },
  msgDetailBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "right",
  },
  msgDetailUsernameAndHowLongAgo: {
    display: "flex",
    flexDirection: "row",
  },
});
