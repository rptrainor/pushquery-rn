import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Talk({ route, navigation }) {
  const returnToMainHome = () => {
    navigation.navigate("Home", {
      screen: "Home"
    });
  };
  return (
    <View>
      <TouchableOpacity onPress={returnToMainHome}>
        <Ionicons name="ios-arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text>Talk.js</Text>
    </View>
  );
}
