import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import Svg, {
  Polyline,
  Line,
  Polygon,
} from "react-native-svg";

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

    const minElevation = Math.min(
      ...elevations
    );

    const maxElevation = Math.max(
      ...elevations
    );

    const elevationRange =
      maxElevation - minElevation || 1;

    const maxDistance =
      profile[profile.length - 1].distance;

    return {
      minElevation,
      maxElevation,
      elevationRange,
      maxDistance,
    };
  }, [profile]);

  if (!chart) {
    return null;
  }

  /*
   * Graph dimensions.
   *
   * The Y axis is kept narrow so that the
   * actual graph gets most of the width.
   */

  const graphWidth = 1000;
  const graphHeight = 190;

  /*
   * Convert the elevation data into SVG coordinates.
   */

  const points = profile.map(point => {
    const x =
      chart.maxDistance > 0
        ? (point.distance /
            chart.maxDistance) *
          graphWidth
        : 0;

    const y =
      graphHeight -
      ((point.elevation -
        chart.minElevation) /
        chart.elevationRange) *
        graphHeight;

    return {
      x,
      y,
    };
  });

  /*
   * SVG polyline requires:
   *
   * "x1,y1 x2,y2 x3,y3..."
   */

  const linePoints = points
    .map(point => `${point.x},${point.y}`)
    .join(" ");

  /*
   * Create a filled polygon underneath
   * the elevation line.
   */

  const areaPoints = [
    ...points,
    {
      x: graphWidth,
      y: graphHeight,
    },
    {
      x: 0,
      y: graphHeight,
    },
  ]
    .map(point => `${point.x},${point.y}`)
    .join(" ");

  /*
   * Four intervals = five labels.
   *
   * 0%
   * 25%
   * 50%
   * 75%
   * 100%
   */

  const distanceIntervals = [0, 33, 66, 100];

  const distanceLabels =
    distanceIntervals.map(percent => ({
      percent,
      distance:
        (chart.maxDistance * percent) /
        100,
    }));

  /*
   * Y-axis middle value.
   */

  const middleElevation =
    (chart.maxElevation +
      chart.minElevation) /
    2;

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Elevation Profile
      </Text>

      <View style={styles.chartRow}>

        {/* Y AXIS */}

        <View style={styles.yAxis}>

          <Text style={styles.yLabel}>
            {Math.round(
              chart.maxElevation
            )} m
          </Text>

          <Text style={styles.yLabel}>
            {Math.round(
              middleElevation
            )} m
          </Text>

          <Text style={styles.yLabel}>
            {Math.round(
              chart.minElevation
            )} m
          </Text>

        </View>

        {/* GRAPH */}

        <View style={styles.graphWrapper}>

          <Svg
            width="100%"
            height={graphHeight}
            viewBox={`0 0 ${graphWidth} ${graphHeight}`}
            preserveAspectRatio="none"
          >

            {/* Horizontal grid lines */}

            <Line
              x1="0"
              y1="0"
              x2={graphWidth}
              y2="0"
              stroke={Colors.border}
              strokeWidth="1"
            />

            <Line
              x1="0"
              y1={graphHeight / 2}
              x2={graphWidth}
              y2={graphHeight / 2}
              stroke={Colors.border}
              strokeWidth="1"
            />

            <Line
              x1="0"
              y1={graphHeight}
              x2={graphWidth}
              y2={graphHeight}
              stroke={Colors.border}
              strokeWidth="1"
            />

            {/* Vertical grid lines */}

            {distanceIntervals.map(
              percent => {

                const x =
                  (percent / 100) *
                  graphWidth;

                return (
                  <Line
                    key={`vertical-${percent}`}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2={graphHeight}
                    stroke={Colors.border}
                    strokeWidth="1"
                  />
                );
              }
            )}

            {/* Filled elevation area */}

            <Polygon
              points={areaPoints}
              fill={Colors.primary}
              opacity={0.08}
            />

            {/* Main elevation line */}

            <Polyline
              points={linePoints}
              fill="none"
              stroke={Colors.primary}
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

          </Svg>

        </View>

      </View>

      {/* X AXIS */}

      <View style={styles.xAxis}>

        {distanceLabels.map(
          (item, index) => {

            const isFirst = index === 0;
            const isLast =
              index ===
              distanceLabels.length - 1;

            return (
              <Text
                key={item.percent}
                style={[
                  styles.xLabel,
                  {
                    left: `${item.percent}%`,
                    transform: [
                      {
                        translateX: isFirst
                          ? 0
                          : isLast
                          ? -32
                          : -20,
                      },
                    ],
                  },
                ]}
              >
                {Math.round(
                  item.distance
                )} m
              </Text>
            );
          }
        )}

      </View>

      <Text style={styles.xAxisTitle}>
        Distance
      </Text>

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
    marginBottom: 18,
  },

  /*
   * Y-axis + graph.
   */

  chartRow: {
    flexDirection: "row",
  },

  /*
   * Much narrower than before.
   */

  yAxis: {
    marginTop: -2,
    width: 38,
    height: 190,
    justifyContent: "space-between",
    paddingVertical: 0,
  },

  yLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
  },

  /*
   * The graph gets essentially all
   * remaining horizontal space.
   */

  graphWrapper: {
    flex: 1,
    height: 190,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },

  /*
   * X-axis labels.
   */

  xAxis: {
    marginLeft: 28,
    height: 20,
    position: "relative",
    marginTop: 7,
  },

  xLabel: {
    position: "absolute",
    fontSize: 10,
    color: Colors.textSecondary,
  },

  xAxisTitle: {
    textAlign: "center",
    marginTop: 3,
    fontSize: 11,
    color: Colors.textSecondary,
  },

});