import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

export default function Host() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Ionicons name="ios-close" size={40} color="#005200" />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>QUERY</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerText}>What did you discover?</Text>
      <TextInput style={styles.textInput} multiline={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F2EEE4",
    borderRadius: 10,
    marginTop: 50,
    alignItems: "stretch",
    justifyContent: "center"
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  headerText: {
    flex: 1,
    fontFamily: "Montserrat-Semibold",
    fontSize: 20,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 8
  },
  textInput: {
    flex: 8,
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    fontSize: 16,
    textAlignVertical: "top",
    textAlign: "left",
    fontFamily: "Lato"
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: "#9842BB",
    borderColor: "#9842BB",
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Montserrat-Semibold",
  },
});
