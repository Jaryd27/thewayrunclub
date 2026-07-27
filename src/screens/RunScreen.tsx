import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, {
  Marker,
  Polyline,
  Region,
} from "react-native-maps";

import {
  getEncodedRoute,
  decodeRoute,
} from "../services/RouteService";

import { Route } from "../types/Route";

import TurnMarker from "../components/TurnMarker";
import NextTurnCard from "../components/NextTurnCard";
import { useRunNavigation } from "../hooks/useRunNavigation";

import { getSelectedClubRoute } from "../routes/getSelectedClubRoute";

function RunNavigation({ route }: { route: Route }) {
  const mapRef = useRef<MapView>(null);

  const {
    currentTurn,
    distanceToTurn,
    isFinished,
  } = useRunNavigation(route);

  const initialRegion: Region = {
    latitude: route.path[0]?.latitude ?? -26.2041,
    longitude: route.path[0]?.longitude ?? 28.0473,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
        onMapReady={() => {
          mapRef.current?.fitToCoordinates(route.path, {
            edgePadding: {
              top: 80,
              right: 80,
              bottom: 250,
              left: 80,
            },
            animated: true,
          });
        }}
      >
        <Polyline
          coordinates={route.path}
          strokeColor="#2563EB"
          strokeWidth={6}
          lineCap="round"
          lineJoin="round"
        />

        {route.landmarks.map((landmark, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: landmark.latitude,
              longitude: landmark.longitude,
            }}
          >
            <TurnMarker
              number={index + 1}
              active={index === currentTurn}
              completed={index < currentTurn}
            />
          </Marker>
        ))}
      </MapView>

      <NextTurnCard
        instruction={
          route.landmarks[currentTurn]?.instruction ?? ""
        }
        road={
          route.landmarks[currentTurn]?.name ?? ""
        }
        distance={distanceToTurn}
        isFinished={isFinished}
      />
    </View>
  );
}

export default function RunScreen() {
  const [route, setRoute] = useState<Route | null>(null);

  useEffect(() => {
    async function loadRoute() {
      const selected = await getSelectedClubRoute();

      const encoded = getEncodedRoute(
        selected.routeLink
      );

      setRoute(decodeRoute(encoded));
    }

    loadRoute();
  }, []);

  if (!route) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <RunNavigation route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});