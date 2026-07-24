import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Colors } from "../theme/colors";
import { ClubRoute } from "../routes/ClubRoutes";

interface Props {
  route: ClubRoute;
  selected: boolean;
  onPress: () => void;
}

export default function RouteCard({
  route,
  selected,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        selected && styles.selectedCard,
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.dot,
            selected && styles.selectedDot,
          ]}
        />

        <Text style={styles.title}>
          {route.name}
        </Text>
      </View>

      <Text style={styles.description}>
        {route.description}
      </Text>

      <View style={styles.divider} />

      <Text style={styles.info}>
        📏 {route.distance} km
      </Text>

      <Text style={styles.info}>
        ⛰ +{route.elevationGain} m
      </Text>

      <Text style={styles.info}>
        ↪ {route.turns} Turns
      </Text>

      <View style={styles.footer}>

        <View
          style={[
            styles.difficultyBadge,

            route.difficulty === "Easy" && styles.easy,

            route.difficulty === "Moderate" && styles.moderate,

            route.difficulty === "Challenging" && styles.hard,
          ]}
        >
          <Text style={styles.difficultyText}>
            {route.difficulty}
          </Text>
        </View>

        {selected && (
          <View style={styles.selectedBadge}>
            <Text style={styles.selectedText}>
              ✓ Selected
            </Text>
          </View>
        )}

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  selectedCard: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#C9C9C9",
    marginRight: 12,
  },

  selectedDot: {
    backgroundColor: Colors.primary,
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: Colors.text,
  },

  description: {
    marginTop: 12,
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 18,
  },

  info: {
    color: Colors.text,
    fontSize: 16,
    marginBottom: 10,
  },

  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  difficultyBadge: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },

  easy: {
    backgroundColor: "#D9F4D8",
  },

  moderate: {
    backgroundColor: "#F5E4D8",
  },

  hard: {
    backgroundColor: "#F8D7D7",
  },

  difficultyText: {
    fontWeight: "700",
    color: Colors.text,
  },

  selectedBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  selectedText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});