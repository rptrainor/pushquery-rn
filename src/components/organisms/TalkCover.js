import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";

// CONFIG IMPORTS
import { AuthContext } from "../../../globalState";
// COMPONENT IMPORTS
import SpinLoader from "../atoms/SpinLoader";
import TalkIconBox from "../molecules/TalkIconBox";
import TertiaryButton from "../atoms/TertiaryButton";
// STYLE SHEET IMPORTS
import { styles, ContainersCSS, SlideShowCSS } from "../../styles/styleSheets";

export const slideMachine = Machine({
  id: "slide",
  initial: "view",
  states: {
    pause: {
      id: "pause",
      states: {
        0: {
          on: {
            PAUSE: "#slide.view.1",
          },
        },
        1: {
          on: {
            PAUSE: "#slide.view.2",
          },
        },
        2: {
          on: {
            PAUSE: "#slide.view.3",
          },
        },
        3: {
          on: {
            PAUSE: "#slide.view.4",
          },
        },
        4: {
          on: {
            PAUSE: "#slide.view.0",
          },
        },
      },
    },
    view: {
      id: "view",
      initial: "0",
      states: {
        0: {
          on: {
            PAUSE: "#slide.pause.0",
          },
          after: {
            3000: "1",
          },
        },
        1: {
          on: {
            PAUSE: "#slide.pause.1",
          },
          after: {
            3000: "2",
          },
        },
        2: {
          on: {
            PAUSE: "#slide.pause.2",
          },
          after: {
            3000: "3",
          },
        },
        3: {
          on: {
            PAUSE: "#slide.pause.3",
          },
          after: {
            3000: "4",
          },
        },
        4: {
          on: {
            PAUSE: "#slide.pause.4",
          },
          after: {
            3000: "0",
          },
        },
      },
    },
  },
});

export default function TalkCover({
  id,
  slides,
  user,
  NextTalk,
  navigation,
  route,
  talk,
}) {
  const { currentUser } = React.useContext(AuthContext);
  const [state, send] = useMachine(slideMachine);

  const handleReport = () => {
    if (!currentUser) {
      alert(
        "We are sorry, you will have to log in before you can report or edit a Talk"
      );
      navigation.navigate("Me", { screen: "Log In" });
    } else {
      navigation.navigate("Report", {
        id: talk._id,
        type: "talk",
        displayName: talk.user.displayName,
        userIdToReport: talk.user._id,
      });
    }
  };

  // console.log(state.value, id, slides);
  // console.log(slides[state.value.view || state.value.pause].slideImg);
  // console.log(Object.keys(state.value)[0]);
  if (!slides || !id) return <SpinLoader />;
  return (
    <View style={SlideShowCSS.container}>
      <SafeAreaView>
        <TalkIconBox
          id={id}
          user={user}
          navigation={navigation}
          talk={talk}
          send={send}
          NextTalk={NextTalk}
        />
        <TouchableOpacity
          onPress={() => send("PAUSE")}
          style={{ height: "100%", width: "100%" }}
        >
          {Object.keys(state.value)[0] == "pause" ? (
            <View style={SlideShowCSS.pauseIcon}>
              <AntDesign
                name="playcircleo"
                size={100}
                color="rgba(251, 251, 251, 0.4)"
              />
            </View>
          ) : (
            <View />
          )}
          <View style={ContainersCSS.FlexColCenteredContainer}>
            {slides && slides[state.value.view || state.value.pause].isImg ? (
              <Image
                style={{
                  resizeMode: "contain",
                  height: "85%",
                  width: "100%",
                }}
                source={{
                  uri: slides[state.value.view || state.value.pause].slideImg,
                }}
              />
            ) : (
              <Text style={SlideShowCSS.containerp}>
                {slides[state.value.view || state.value.pause].slideText}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
