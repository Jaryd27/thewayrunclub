import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Screen from "../components/Screen";
import Button from "../components/Button";

import { Colors } from "../theme/colors";
import { FontSize } from "../theme/typography";

export default function HomeScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>WayRunner</Text>

        <Text style={styles.subtitle}>
          Find your way. Run with confidence.
        </Text>

        <View style={{ marginTop: 40 }}>
          <Button
            title="Start Running"
            onPress={() => console.log("Pressed")}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.title,
    fontWeight: "700",
  },
  subtitle: {
    color: Colors.textSecondary,
    marginTop: 8,
    fontSize: FontSize.body,
  },
});