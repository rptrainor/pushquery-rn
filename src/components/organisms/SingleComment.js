import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import formatDistance from "date-fns/formatDistance";
import { Entypo } from "@expo/vector-icons";
import {
  PRIMARY,
  GRAY_DARK,
  SECONDARY,
  GRAY_MEDIUM,
  GRAY_LIGHT,
  BACKGROUND,
} from "../../styles/colors";

export default function SingleComment({ message, user }) {
  const [
    isCurrentUserCommentAuthor,
    setIsCurrentUserCommentAuthor,
  ] = React.useState(false);
  const msgCreatedAt = message.createdAt;
  const howLongAgo = formatDistance(Date.now(), msgCreatedAt, []);

  React.useEffect(() => {
    if (user.uid == message.user._id) setIsCurrentUserCommentAuthor(true);
  });

  // console.log(user.photoURL);
  // console.log(user.displayName);
  // console.log(user.uid);
  // console.log(message);
  console.log(message.user);
  return (
    <View
      style={[
        isCurrentUserCommentAuthor
          ? SingleCommentStyles.singleCommentRight
          : SingleCommentStyles.singleCommentLeft,
      ]}
    >
      <Image
        style={[
          isCurrentUserCommentAuthor
            ? SingleCommentStyles.avatarRight
            : SingleCommentStyles.avatarLeft,
        ]}
        source={{
          uri: message.user.photoURL,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          top: -40,
          left: 50,
        }}
      >
        <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
          {message.user.displayName}
        </Text>
        <Text style={{ color: GRAY_DARK, marginLeft: 10 }}>
          posted {howLongAgo} ago
        </Text>
      </View>
      <View style={{ top: -40, marginHorizontal: 5 }}>
        <Text>{message.text}</Text>
      </View>
    </View>
  );
}

const SingleCommentStyles = StyleSheet.create({
  singleCommentRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
    backgroundColor: BACKGROUND,
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
    marginLeft: 50,
  },
  singleCommentLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
    marginRight: 50,
  },
  avatarRight: {
    display: "flex",
    flex: 1,
    width: 40,
    height: 40,
    borderRadius: 400,
    resizeMode: "contain",
    top: -20,
    left: 10,
    alignSelf: "flex-start",
  },
  avatarLeft: {
    display: "flex",
    flex: 1,
    width: 40,
    height: 40,
    borderRadius: 400,
    resizeMode: "contain",
    top: -20,
    left: 10,
    alignSelf: "flex-start",
  },
});
