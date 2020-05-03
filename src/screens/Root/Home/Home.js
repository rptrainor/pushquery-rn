import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>The feed of queries will go here</Text>
      <Text style={styles.textLato}>The feed of queries will go here</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Montserrat-Semibold",
  },
  textLato: {
    fontFamily: "Lato",
  }
});
