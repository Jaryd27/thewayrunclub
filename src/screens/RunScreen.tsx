import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import MapView, {
  Marker,
  Polyline,
  Region,
} from "react-native-maps";

import { sampleRouteLink } from "../routes/SampleRoute";
import {
  getEncodedRoute,
  decodeRoute,
} from "../services/RouteService";

import TurnMarker from "../components/TurnMarker";
import NextTurnCard from "../components/NextTurnCard";
import { useRunNavigation } from "../hooks/useRunNavigation";

const encoded = getEncodedRoute(sampleRouteLink);
const route = decodeRoute(encoded);

export default function RunScreen() {
  const mapRef = useRef<MapView>(null);

  const {
    location,
    currentTurn,
    distanceToTurn,
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
          if (route.path.length > 0) {
            mapRef.current?.fitToCoordinates(route.path, {
              edgePadding: {
                top: 80,
                right: 80,
                bottom: 250,
                left: 80,
              },
              animated: true,
            });
          }
        }}
      >
        {/* User Marker */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You"
          />
        )}

        {/* Route */}
        <Polyline
          coordinates={route.path}
          strokeColor="#2563EB"
          strokeWidth={6}
          lineCap="round"
          lineJoin="round"
        />

        {/* Turn Markers */}
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
          route.landmarks[currentTurn]?.instruction ??
          "Route Complete"
        }
        road={
          route.landmarks[currentTurn]?.name ??
          ""
        }
        distance={distanceToTurn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
});