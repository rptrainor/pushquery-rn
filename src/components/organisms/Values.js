import React from "react";
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { styles } from "../../styles/styleSheets";
import { BACKGROUND, SECONDARY_TEXT, PRIMARY } from "../../styles/colors";

export default function Values() {
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: PRIMARY }} />
      <View
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          height: "100%",
          backgroundColor: PRIMARY,
          justifyContent: "space-around",
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
          The 3 Laws of Pushquery
        </Text>
        <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>
          1. Be Kind
        </Text>
        <Text style={{ color: "#FFF", fontSize: 14 }}>
          We are a community that leads with love. We live this value by making
          sure our comments help, support, and encourage every person that we
          communicate with. Language that does not demonstrate kindness towards
          others will be removed, and the author of the comment will be held
          accountable for their violation of our values. There will be no
          tolerance for objectionable content or abusive users inside the
          Pushquery community.
        </Text>
        <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>
          2. Be Helpful
        </Text>
        <Text style={{ color: "#FFF", fontSize: 14 }}>
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
        <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>
          3. Do Your Best{" "}
        </Text>
        <Text style={{ color: "#FFF", fontSize: 14 }}>
          Learn! Explore! Ask questions. There is no such thing as a dumb
          question in the Pushquery community. Everyone is encouraged to join
          the conversations that are happening in the different Talks. And if
          you would like to get some early feedback on your own Talk, share your
          Talk’s link and invite your lab-mates / colleagues to help you get the
          conversation going.
        </Text>
      </View>
    </>
  );
}
