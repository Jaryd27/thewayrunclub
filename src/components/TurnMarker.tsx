import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  number: number;
  completed?: boolean;
  active?: boolean;
};

export default function TurnMarker({
  number,
  completed = false,
  active = false,
}: Props) {
  return (
    <View
      style={[
        styles.circle,
        completed && styles.completed,
        active && styles.active,
      ]}
    >
      <Text style={styles.text}>
        {completed ? "✓" : number}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },

  completed: {
    backgroundColor: "#22C55E",
  },

  active: {
    backgroundColor: "#F97316",
    transform: [{ scale: 1.2 }],
  },

  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});