import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import Button from "./Button";

import { Colors } from "../theme/colors";
import { FontSize } from "../theme/typography";

import {
  ClubRoute,
  clubRoutes,
} from "../routes/ClubRoutes";

import { getSelectedClubRoute } from "../routes/getSelectedClubRoute";

export default function Dashboard() {
  const navigation = useNavigation<any>();

  const [selectedRoute, setSelectedRoute] =
    useState<ClubRoute>(clubRoutes[0]);

  const hour = new Date().getHours();

  let greeting = "Good Morning ☀";

  if (hour >= 12 && hour < 18) {
    greeting = "Good Afternoon ☀";
  }

  if (hour >= 18) {
    greeting = "Good Evening 🌙";
  }

  useFocusEffect(
    useCallback(() => {
      async function loadRoute() {
        const route = await getSelectedClubRoute();
        setSelectedRoute(route);
      }

      loadRoute();
    }, [])
  );

  return (
    <View style={styles.container}>

      <Text style={styles.greeting}>
        {greeting}
      </Text>

      <Text style={styles.heading}>
        Today's Run
      </Text>

      <View style={styles.routeCard}>

        <Text style={styles.routeName}>
          {selectedRoute.name}
        </Text>

        <View style={styles.infoRow}>

          <Text style={styles.info}>
            📏 {selectedRoute.distance} km
          </Text>

          <Text style={styles.info}>
            ↪ {selectedRoute.turns} Turns
          </Text>

        </View>

        <View style={styles.selectedBadge}>
          <Text style={styles.selectedText}>
            ✓ Selected
          </Text>
        </View>

      </View>

      <View style={{ marginTop: 28 }}>
        <Button
          title="Start Running"
          onPress={() => navigation.navigate("Run")}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Routes")}
      >
        <Text style={styles.routes}>
          Explore Routes →
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 60,
  },

  greeting: {
    fontSize: FontSize.heading,
    fontWeight: "700",
    color: Colors.text,
  },

  heading: {
    marginTop: 18,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },

  routeCard: {
    marginTop: 15,
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  routeName: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  info: {
    fontSize: 16,
    color: Colors.textSecondary,
  },

  selectedBadge: {
    marginTop: 22,
    alignSelf: "flex-start",
    backgroundColor: "#F5E4D8",
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  selectedText: {
    color: Colors.primary,
    fontWeight: "700",
  },

  routes: {
    marginTop: 25,
    textAlign: "center",
    color: Colors.primary,
    fontSize: 17,
    fontWeight: "600",
  },
});