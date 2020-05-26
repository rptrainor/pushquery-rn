import React from "react";
import { View, StyleSheet, Text } from "react-native";
import formatDistance from "date-fns/formatDistance";
import { FontAwesome5 } from "@expo/vector-icons";
import { PRIMARY, GRAY_DARK } from "../../styles/colors";

export default function TalkMsg({ item }) {
  const msgCreatedAt = item.createdAt;
  const howLongAgo = formatDistance(Date.now(), msgCreatedAt, []);

  return (
    <View style={msgStyles.container}>
      <FontAwesome5 name="user-astronaut" size={17} style={msgStyles.avatar} />
      <View style={msgStyles.msgBox}>
        <View style={msgStyles.msgDetailBox}>
          <Text style={msgStyles.username}>
            {item.user.displayName ? item.user.displayName : item.user.email}
            {"  "}
          </Text>
          <Text style={msgStyles.time}>{howLongAgo}</Text>
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
  },
  username: {
    color: PRIMARY,
    fontWeight: "bold",
  },
  time: {
    color: GRAY_DARK,
    // fontWeight: "200",
  },
  msgDetailBox: {
    display: "flex",
    flexDirection: "row",
  },
});
