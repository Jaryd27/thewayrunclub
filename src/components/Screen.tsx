import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "../theme/colors";

interface Props {
  children: React.ReactNode;
}

export default function Screen({ children }: Props) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
});