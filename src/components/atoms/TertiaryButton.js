import React from "react";
import { TouchableOpacity, Text } from "react-native";

// STYLE SHEET IMPORTS
import { ButtonsCSS } from "../../styles/styleSheets";

export default function TertiaryButton({ onClickFunction, buttonText }) {
  return (
    <TouchableOpacity
      onPress={onClickFunction}
      style={ButtonsCSS.tertiaryButton}
    >
      <Text style={ButtonsCSS.tertiaryButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}
