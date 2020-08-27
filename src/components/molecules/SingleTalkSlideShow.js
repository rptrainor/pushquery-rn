import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// CONFIG IMPORTS

// COMPONENT IMPORTS
import TertiaryButton from "../atoms/TertiaryButton";
import ReviewIconBox from "../molecules/ReviewIconBox";
// STYLE SHEET IMPORTS
import { ContainersCSS, SlideShowCSS } from "../../styles/styleSheets";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SingleTalkSlideShow({
  slides,
  showSlideShow,
  toggleShowSlideShow,
}) {
  const [reviewSlideIndex, setReviewSlideIndex] = React.useState(0);

  const backOneSlide = () => {
    setReviewSlideIndex(reviewSlideIndex - 1);
  };

  const forwardOneSlide = () => {
    setReviewSlideIndex(reviewSlideIndex + 1);
  };

  console.log({ reviewSlideIndex });
  return (
    <View style={SlideShowCSS.container}>
      <SafeAreaView>
        <ReviewIconBox
          toggleShowSlideShow={toggleShowSlideShow}
          showSlideShow={showSlideShow}
          reviewSlideIndex={reviewSlideIndex}
          backOneSlide={backOneSlide}
          forwardOneSlide={forwardOneSlide}
        />
        <View style={ContainersCSS.FlexColCenteredContainer}>
          {slides && slides[reviewSlideIndex].isImg ? (
            <Image
              style={{
                resizeMode: "contain",
                height: "85%",
                width: "100%",
              }}
              source={{
                uri: slides[reviewSlideIndex].slideImg,
              }}
            />
          ) : (
            <Text style={SlideShowCSS.containerp} selectable={true}>
              {slides[reviewSlideIndex].slideText}
            </Text>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
