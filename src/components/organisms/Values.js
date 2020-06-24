import React from "react";
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { styles } from "../../styles/styleSheets";
import { BACKGROUND, SECONDARY_TEXT, PRIMARY } from "../../styles/colors";

export default function Values() {
  return (
    <SafeAreaView style={valuesStyles.scrollContainer}>
      <ScrollView
        style={valuesStyles.container}
        contentContainerStyle={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginBottom: 10,
        }}
      >
        <Text style={styles.header_text}>The 3 Laws of Pushquery</Text>
        <Text style={styles.header2_text}>1. Be Kind</Text>
        <Text style={valuesStyles.tosText}>
          We are a community that leads with love. We live this value by making
          sure our comments help, support, and encourage every person that we
          communicate with. Language that does not demonstrate kindness towards
          others will be removed, and the author of the comment will be held
          accountable for their violation of our values. There will be no
          tolerance for objectionable content or abusive users inside the
          Pushquery community.
        </Text>
        <Text style={styles.header2_text}>2. Be Helpful</Text>
        <Text style={valuesStyles.tosText}>
          We believe that scholarly research should be open, accessible, and
          encourage participation. Research does not need to exist only steeped
          in dense discipline jargon or locked behind paywalls. Imagine that you
          are discussing your research with a researcher from a different field,
          or maybe you are lucky enough to be presenting to a classroom of
          school children -- how would you explain that new and interesting
          research question you are trying to solve? This is the language we
          want to encourage within the Pushquery community, language that both
          informs your peers and invites newcomers to your field to join the
          conversation.
        </Text>
        <Text style={styles.header2_text}>3. Do Your Best </Text>
        <Text style={valuesStyles.tosText}>
          Learn! Explore! Ask questions. There is no such thing as a dumb
          question in the Pushquery community. Everyone is encouraged to join
          the conversations that are happening in the different Talks. And if
          you would like to get some early feedback on your own Talk, share your
          Talk’s link and invite your lab-mates / colleagues to help you get the
          conversation going.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const valuesStyles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: BACKGROUND,
    marginTop: 20,
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
  tosText: {
    lineHeight: 18,
    width: "90%",
    margin: 10,
  },
  scrollContainer: {
    backgroundColor: BACKGROUND,
  },
});
