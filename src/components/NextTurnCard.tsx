import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  instruction: string;
  road: string;
  distance: number;
  isFinished?: boolean;
};

export default function NextTurnCard({
  instruction,
  road,
  distance,
  isFinished = false,
}: Props) {
  return (
    <View style={styles.card}>
      {isFinished ? (
        <>
          <Text style={styles.finishedIcon}>🏁</Text>
          <Text style={styles.finishedTitle}>Route Complete</Text>
          <Text style={styles.finishedSubtitle}>Great run! 🎉</Text>
        </>
      ) : (
        <>
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
        </>
      )}
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
    borderRadius: 20,
    padding: 20,

    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },

  heading: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2563EB",
    letterSpacing: 0.5,
  },

  instruction: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 8,
    color: "#111827",
  },

  road: {
    fontSize: 17,
    color: "#6B7280",
    marginTop: 4,
  },

  distance: {
    marginTop: 18,
    fontSize: 40,
    fontWeight: "800",
    color: "#2563EB",
  },

  finishedIcon: {
    fontSize: 44,
    textAlign: "center",
  },

  finishedTitle: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 10,
    color: "#111827",
  },

  finishedSubtitle: {
    fontSize: 17,
    textAlign: "center",
    marginTop: 6,
    color: "#6B7280",
  },
});