import React, { useEffect, useRef, useState } from "react";
import MapView, {
  Polyline,
  Marker,
} from "react-native-maps";
import { StyleSheet } from "react-native";

import { Colors } from "../theme/colors";

import { Route } from "../types/Route";

import {
  getEncodedRoute,
  decodeRoute,
} from "../services/RouteService";

import { getSelectedClubRoute } from "../routes/getSelectedClubRoute";

export default function MiniRoutePreview() {
  const mapRef = useRef<MapView>(null);

  const [route, setRoute] = useState<Route | null>(null);

  useEffect(() => {
    async function loadRoute() {
      const selected = await getSelectedClubRoute();

      const encoded = getEncodedRoute(
        selected.routeLink
      );

      const decoded = decodeRoute(encoded);

      setRoute(decoded);
    }

    loadRoute();
  }, []);

  useEffect(() => {
    if (!route || !mapRef.current) return;

    mapRef.current.fitToCoordinates(route.path, {
      edgePadding: {
        top: 25,
        right: 25,
        bottom: 25,
        left: 25,
      },
      animated: false,
    });
  }, [route]);

  if (!route) {
    return null;
  }

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      pointerEvents="none"
      toolbarEnabled={false}
      rotateEnabled={false}
      pitchEnabled={false}
      scrollEnabled={false}
      zoomEnabled={false}
      showsCompass={false}
      showsScale={false}
      showsBuildings={false}
      showsTraffic={false}
      showsUserLocation={false}
      showsMyLocationButton={false}
    >
      <Polyline
        coordinates={route.path}
        strokeColor={Colors.primary}
        strokeWidth={5}
      />

      <Marker coordinate={route.path[0]} />

      <Marker coordinate={route.path[route.path.length - 1]} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 180,
    borderRadius: 24,
    overflow: "hidden",
  },
});