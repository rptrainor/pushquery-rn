import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import {
  BACKGROUND,
  PARAGRAPH_COLOR,
  HIGHLIGHT_DARK,
  WHITE,
  PRIMARY,
} from "./colors";
import {
  PARAGRAPH_LINK_TEXT,
  BUTTON_TEXT_INPUTS,
  HEADER_TEXT,
  SECONDARY_TEXT,
} from "./typography";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    // flex: 1,
    // marginTop: Constants.statusBarHeight,
    backgroundColor: BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
  },
  padding: {
    marginVertical: 10,
  },
  header_text: {
    fontSize: HEADER_TEXT,
    fontFamily: "Lato",
    color: PRIMARY,
    fontWeight: "bold",
    margin: 5,
  },
  header2_text: {
    fontSize: SECONDARY_TEXT,
    fontFamily: "Lato",
    color: PRIMARY,
    fontWeight: "bold",
    margin: 5,
    marginBottom: 0,
  },
  paragraph_text: {
    fontSize: PARAGRAPH_LINK_TEXT,
    fontFamily: "OpenSans",
    color: PARAGRAPH_COLOR,
  },
  form_text_input: {
    width: "100%",
    padding: 5,
    paddingLeft: 10,
    margin: 5,
    fontSize: BUTTON_TEXT_INPUTS,
    color: PARAGRAPH_COLOR,
    backgroundColor: WHITE,
    borderRadius: 10,
    fontFamily: "Lato",
  },
  statusBarView: {
    height: Constants.statusBarHeight,
    backgroundColor: BACKGROUND,
    width: "100%",
  },
});

export const buttons = StyleSheet.create({
  primary_button: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: PRIMARY,
    padding: 5,
    margin: 5,
  },
  primary_button_text: {
    fontSize: BUTTON_TEXT_INPUTS,
    color: WHITE,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Lato",
  },
  secondary_button: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "transparent",
    borderColor: PRIMARY,
    borderWidth: 3,
    padding: 5,
    margin: 5,
  },
  secondary_button_text: {
    fontSize: BUTTON_TEXT_INPUTS,
    color: PRIMARY,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Lato",
  },
});

export const talkCover = StyleSheet.create({
  container: {
    width: "80%",
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
});
