import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, buttons } from "../styles/styleSheets";
import { BACKGROUND, PRIMARY } from "../styles/colors";
import { SECONDARY_TEXT } from "../styles/typography";
import Firebase from "../../config/firebase";
import { AuthContext } from "../../globalState";

export default function Report({ route, navigation }) {
  const [ID, setID] = React.useState("");
  const [type, setType] = React.useState("");
  const [displayName, setDisplayname] = React.useState("");
  const [complaint, setComplaint] = React.useState("");
  const [userIdToReport, setUserIdToReport] = React.useState("");
  const [wantToReport, setWantToReport] = React.useState(false);
  const [wantToBlock, setWantToBlock] = React.useState(false);
  const toggleReportSwtich = () =>
    setWantToReport((previousState) => !previousState);
  const toggleBlockSwtich = () =>
    setWantToBlock((previousState) => !previousState);
  const { currentUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (route.params && route.params.id) {
      setID(route.params.id);
    }
    if (route.params && route.params.type) {
      setType(route.params.type);
    }
    if (route.params && route.params.displayName) {
      setDisplayname(route.params.displayName);
    }
    if (route.params && route.params.userIdToReport) {
      setUserIdToReport(route.params.userIdToReport);
    }
  }, [route]);
  
  // const handleSubmit = async () => {
  //   if (type == "talk" && wantToReport) {
  //     await Firebase.firestore()
  //       .collection("talks")
  //       .doc(ID)
  //       .collection("flags")
  //       .add({
  //         reportedAt: new Date().getTime(),
  //         complaint,
  //         user: {
  //           _id: currentUser.uid,
  //           email: currentUser.email,
  //           displayName: currentUser.displayName,
  //         },
  //       });
  //   }
  //   if (type == "comment" && wantToReport) {
  //     await Firebase.firestore()
  //       .collection("messages")
  //       .doc(ID)
  //       .add({
  //         reportedAt: new Date().getTime(),
  //         complaint,
  //         user: {
  //           _id: currentUser.uid,
  //           email: currentUser.email,
  //           displayName: currentUser.displayName,
  //         },
  //       });
  //   }
  //   if (wantToBlock) {
  //     Firebase.auth().currentUser.updateProfile({
  //       blocking: [...]
  //     })
  //   }
  // };
  console.log(complaint);

  return (
    <View>
      <View style={styles.statusBarView} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="ios-arrow-back"
          size={24}
          color="black"
          style={reportStyles.backBtn}
        />
      </TouchableOpacity>
      <View style={reportStyles.container}>
        <View style={reportStyles.reportContainer}>
          <Text style={styles.header_text}>
            Would you like to report this {type}?
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={wantToReport ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleReportSwtich}
            value={wantToReport}
          />
          {wantToReport ? (
            <React.Fragment>
              <Text style={styles.header_text}>
                Please, tell us what is wrong with this {type}
              </Text>
              <TextInput
                style={styles.form_text_input}
                placeholder="reason for reporting"
                onChangeText={(complaint) => setComplaint(complaint)}
                value={complaint}
              />
            </React.Fragment>
          ) : (
            <React.Fragment />
          )}
          <Text style={styles.header_text}>
            Would you like to block {displayName}?
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={wantToBlock ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleBlockSwtich}
            value={wantToBlock}
          />
          <TouchableOpacity
            style={buttons.primary_button}
            onPress={handleSubmit}
          >
            <Text style={buttons.primary_button_text}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const reportStyles = StyleSheet.create({
  backBtn: {
    padding: 10,
    textAlign: "left",
    backgroundColor: BACKGROUND,
  },
  container: {
    display: "flex",
    backgroundColor: BACKGROUND,
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
  },
  reportContainer: {
    marginTop: 100,
    backgroundColor: BACKGROUND,
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  backBtn: {
    backgroundColor: BACKGROUND,
    padding: 10,
  },
  header2: {
    fontSize: SECONDARY_TEXT,
    fontFamily: "Lato",
    color: PRIMARY,
  },
});
