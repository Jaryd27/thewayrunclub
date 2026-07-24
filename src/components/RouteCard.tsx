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
      activeOpacity={0.8}
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

      <View style={styles.infoRow}>
        <Text style={styles.info}>
          📏 {route.distance} km
        </Text>

        <Text style={styles.info}>
          ↪ {route.turns} Turns
        </Text>
      </View>

      {selected && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            ✓ Selected
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,

    borderRadius: 22,

    padding: 20,

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
    width: 12,

    height: 12,

    borderRadius: 6,

    backgroundColor: "#CFCFCF",

    marginRight: 12,
  },

  selectedDot: {
    backgroundColor: Colors.primary,
  },

  title: {
    fontSize: 20,

    color: Colors.text,

    fontWeight: "700",
  },

  infoRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 18,
  },

  info: {
    fontSize: 15,

    color: Colors.textSecondary,
  },

  badge: {
    marginTop: 20,

    alignSelf: "flex-start",

    backgroundColor: "#F5E4D8",

    borderRadius: 20,

    paddingHorizontal: 14,

    paddingVertical: 8,
  },

  badgeText: {
    color: Colors.primary,

    fontWeight: "700",
  },
});