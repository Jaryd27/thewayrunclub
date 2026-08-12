import React, { useCallback, useMemo, useState } from "react";
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
import InteractiveRouteMap from "./InteractiveRouteMap";
import StatCard from "./StatCard";
import ExpandableSection from "./ExpandableSection";

import { Colors } from "../theme/colors";

import {
  ClubRoute,
  clubRoutes,
} from "../routes/ClubRoutes";

import { getSelectedClubRoute } from "../routes/getSelectedClubRoute";

import {
  getEncodedRoute,
  decodeRoute,
} from "../services/RouteService";

import ElevationProfile from "./ElevationProfile";

interface RoutePoint {
  latitude: number;
  longitude: number;
  elevation: number | null;
}

function getDistanceMeters(
  point1: RoutePoint,
  point2: RoutePoint
): number {
  const R = 6371000;

  const lat1 = (point1.latitude * Math.PI) / 180;
  const lat2 = (point2.latitude * Math.PI) / 180;

  const deltaLat =
    ((point2.latitude - point1.latitude) * Math.PI) / 180;

  const deltaLon =
    ((point2.longitude - point1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) *
      Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c =
    2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

export default function Dashboard() {
  const navigation = useNavigation<any>();

  const [selectedRoute, setSelectedRoute] =
    useState<ClubRoute>(clubRoutes[0]);

  /*
   * Decode the currently selected route.
   */
  const decodedRoute = useMemo(() => {
    try {
      const encoded = getEncodedRoute(
        selectedRoute.routeLink
      );

      return decodeRoute(encoded);
    } catch (error) {
      console.error(
        "Failed to decode route:",
        error
      );

      return null;
    }
  }, [selectedRoute]);

  /*
   * Build the elevation profile.
   *
   * distance = actual cumulative distance
   * elevation = elevation at that point
   */
  const elevationProfile = useMemo(() => {
    if (!decodedRoute) {
      return [];
    }

    const points = decodedRoute.path as RoutePoint[];

    if (points.length < 2) {
      return [];
    }

    let cumulativeDistance = 0;

    const profile = [];

    for (let i = 0; i < points.length; i++) {
      if (i > 0) {
        cumulativeDistance += getDistanceMeters(
          points[i - 1],
          points[i]
        );
      }

      const elevation = points[i].elevation;

      if (elevation !== null) {
        profile.push({
          distance: cumulativeDistance,
          elevation,
        });
      }
    }

    return profile;
  }, [decodedRoute]);

  console.log(
    "Dashboard elevation points:",
    elevationProfile.length
  );

  console.log(
    "Dashboard route distance:",
    elevationProfile.length > 0
      ? elevationProfile[
          elevationProfile.length - 1
        ].distance
      : 0
  );

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
        const route =
          await getSelectedClubRoute();

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

      <ExpandableSection title="Today's Route">

        <InteractiveRouteMap
          route={selectedRoute}
        />

        {elevationProfile.length >= 2 && (
          <ElevationProfile
            profile={elevationProfile}
          />
        )}

      </ExpandableSection>

      <View style={styles.buttonContainer}>

        <Button
          title="Start Run"
          onPress={() =>
            navigation.navigate("Run")
          }
        />

      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Routes")
        }
      >
        <Text style={styles.routes}>
          Explore Other Routes →
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
    marginTop: 36,
  },

  routes: {
    marginTop: 22,
    textAlign: "center",
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 17,
    marginBottom: 50,
  },
});