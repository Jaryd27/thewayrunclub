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
import MiniRoutePreview from "./miniRoutePreview";
import StatCard from "./StatCard";

import { Colors } from "../theme/colors";

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

      <Text style={styles.ready}>
        Ready to move?
      </Text>

      <Text style={styles.section}>
        TODAY'S RUN
      </Text>

      <MiniRoutePreview />

      <Text style={styles.routeName}>
        {selectedRoute.name}
      </Text>

      <Text style={styles.description}>
        {selectedRoute.description}
      </Text>

      <View style={styles.statsRow}>

        <StatCard
          icon="📏"
          title="Distance"
          value={`${selectedRoute.distance} km`}
        />

        <View style={styles.spacing} />

        <StatCard
          icon="⛰"
          title="Elevation Gain"
          value={`+${selectedRoute.elevationGain} m`}
        />

        <View style={styles.spacing} />

        <StatCard
          icon="🟠"
          title="Difficulty"
          value={selectedRoute.difficulty}
        />

      </View>

      <View style={styles.buttonContainer}>

        <Button
          title="Start Run"
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
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
  },

  ready: {
    marginTop: 8,
    fontSize: 18,
    color: Colors.textSecondary,
  },

  section: {
    marginTop: 40,
    marginBottom: 18,

    fontSize: 13,

    letterSpacing: 2,

    fontWeight: "700",

    color: Colors.textSecondary,
  },

  routeName: {
    marginTop: 24,

    fontSize: 28,

    fontWeight: "700",

    textAlign: "center",

    color: Colors.text,
  },

  description: {
    marginTop: 14,

    textAlign: "center",

    fontSize: 16,

    lineHeight: 24,

    color: Colors.textSecondary,
  },

  statsRow: {
    flexDirection: "row",

    marginTop: 30,
  },

  spacing: {
    width: 10,
  },

  buttonContainer: {
    marginTop: 40,
  },

  routes: {
    marginTop: 22,

    textAlign: "center",

    color: Colors.primary,

    fontWeight: "600",

    fontSize: 17,
  },

});