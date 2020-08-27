import React from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";

// STYLESHEET IMPORTS
import { PRIMARY } from "../../styles/colors";

export default function SpinLoader() {
  return (
    <>
      <StatusBar hidden={true} />
      <View
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: PRIMARY,
        }}
      >
        <ActivityIndicator />
      </View>
    </>
  );
}
