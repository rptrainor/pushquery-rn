import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

import HostFooter from "./HostFooter";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3ddfdfda1-471f-bd96-145571e29d72",
    title: "Forth Item",
  },
  {
    id: "58694adfd0f-3ddfdfda1-471f-bdfd96-145571e29d72",
    title: "Fifth Item",
  },
  {
    id: "5869fd0f-3dfdfdljlkjda1-471f-bdfd96-145571e29d72",
    title: "Sixth Item",
  },
];

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default function Host() {
  // const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
      <KeyboardAvoidingView
        behavior="position"
        // keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <HostFooter />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#F2EEE4",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  flatList: {
    width: "100%",
    backgroundColor: "#F2EEE4",
  },
});
