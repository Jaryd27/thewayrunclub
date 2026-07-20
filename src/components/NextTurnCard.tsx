import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  instruction: string;
  road: string;
  distance: number;
};

export default function NextTurnCard({
  instruction,
  road,
  distance,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>➡ NEXT TURN</Text>

      <Text style={styles.instruction}>
        {instruction}
      </Text>

      <Text style={styles.road}>
        {road || "Unnamed Road"}
      </Text>

      <Text style={styles.distance}>
        {Math.round(distance)} m
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    left: 15,
    right: 15,
    bottom: 25,

    backgroundColor: "white",

    borderRadius: 18,

    padding: 18,

    elevation: 8,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  heading: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB",
  },

  instruction: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 8,
  },

  road: {
    fontSize: 17,
    color: "#666",
    marginTop: 4,
  },

  distance: {
    marginTop: 14,
    fontSize: 34,
    fontWeight: "700",
    color: "#2563EB",
  },
});