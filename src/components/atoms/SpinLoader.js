import React from "react";
import { View, ActivityIndicator } from "react-native";

// STYLESHEET IMPORTS
import { styles } from "../../styles/styleSheets";

export default function SpinLoader() {
  return (
    <View style={styles.SpinLoaderContainer}>
      <ActivityIndicator style={styles.SpinLoader} />
    </View>
  );
}
