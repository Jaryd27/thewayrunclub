import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../theme/colors";

interface ElevationPoint {
  distance: number;
  elevation: number;
}

interface Props {
  profile: ElevationPoint[];
}

export default function ElevationProfile({
  profile,
}: Props) {

  const chart = useMemo(() => {

    if (!profile || profile.length < 2) {
      return null;
    }

    const elevations = profile.map(
      point => point.elevation
    );

    const minElevation = Math.min(...elevations);
    const maxElevation = Math.max(...elevations);

    const range =
      maxElevation - minElevation || 1;

    return {
      minElevation,
      maxElevation,
      range,
    };

  }, [profile]);

  if (!chart) {
    return null;
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Elevation
      </Text>

      <View style={styles.chart}>

        {profile.map((point, index) => {

          const percentage =
            (point.elevation - chart.minElevation) /
            chart.range;

          const left =
            (index / (profile.length - 1)) * 100;

          const bottom =
            percentage * 100;

          return (
            <View
              key={index}
              style={[
                styles.point,
                {
                  left: `${left}%`,
                  bottom: `${bottom}%`,
                },
              ]}
            />
          );

        })}

      </View>

      <View style={styles.labels}>

        <Text style={styles.label}>
          {Math.round(chart.minElevation)} m
        </Text>

        <Text style={styles.label}>
          {Math.round(chart.maxElevation)} m
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 20,
    padding: 18,
    borderRadius: 20,
    backgroundColor: Colors.surface,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 15,
  },

  chart: {
    height: 150,
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: Colors.textSecondary,
  },

  point: {
    position: "absolute",
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },

  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  label: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

});