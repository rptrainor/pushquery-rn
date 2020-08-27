import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// CSS IMPORTS
import { SlideShowCSS } from "../../styles/styleSheets";

export default function ReviewIconBox({
  toggleShowSlideShow,
  showSlideShow,
  reviewSlideIndex,
  backOneSlide,
  forwardOneSlide,
}) {
  return (
    <View style={SlideShowCSS.iconBox}>
      {reviewSlideIndex !== 0 && showSlideShow ? (
        <TouchableOpacity onPress={backOneSlide}>
          <AntDesign name="leftcircleo" size={40} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40, height: 40 }} />
      )}
      <TouchableOpacity onPress={toggleShowSlideShow}>
        <AntDesign
          name={showSlideShow ? "message1" : "iconfontdesktop"}
          size={40}
          color="#fff"
        />
      </TouchableOpacity>
      {reviewSlideIndex !== 4 && showSlideShow ? (
        <TouchableOpacity onPress={forwardOneSlide}>
          <AntDesign name="rightcircleo" size={40} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40, height: 40 }} />
      )}
    </View>
  );
}
