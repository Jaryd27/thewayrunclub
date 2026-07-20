import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, {
  Marker,
  Polyline,
  Region,
} from "react-native-maps";
import * as Location from "expo-location";

import { sampleRouteLink } from "../routes/SampleRoute";
import {
  getEncodedRoute,
  decodeRoute,
} from "../services/RouteService";

import TurnMarker from "../components/TurnMarker";
import NextTurnCard from "../components/NextTurnCard";

const encoded = getEncodedRoute(sampleRouteLink);
const route = decodeRoute(encoded);

export default function RunScreen() {
  const mapRef = useRef<MapView>(null);

  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);

  const [currentTurn, setCurrentTurn] = useState(0);

  useEffect(() => {
    getLocation();

    if (route.path.length > 0) {
      setTimeout(() => {
        mapRef.current?.fitToCoordinates(route.path, {
          edgePadding: {
            top: 80,
            right: 80,
            bottom: 250,
            left: 80,
          },
          animated: true,
        });
      }, 500);
    }
  }, []);

  async function getLocation() {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Location permission denied");
      return;
    }

    const currentLocation =
      await Location.getCurrentPositionAsync({});

    setLocation(currentLocation);
  }

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
      >
        {/* User marker */}
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

        {/* Turn markers */}
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
        distance={42}
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