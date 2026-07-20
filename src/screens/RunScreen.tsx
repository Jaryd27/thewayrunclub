import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet } from "react-native";

import { Polyline } from "react-native-maps";

import { sampleRouteLink } from "../routes/SampleRoute";

import {
    getEncodedRoute,
    decodeRoute
} from "../services/RouteService";

const encoded = getEncodedRoute(sampleRouteLink);

const route = decodeRoute(encoded);

export default function RunScreen() {
  const mapRef = useRef<MapView>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Location permission denied");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});

    setLocation(currentLocation);

    mapRef.current?.animateToRegion(
      {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    );
  }

  const initialRegion: Region = {
    latitude: -26.2041,
    longitude: 28.0473,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={initialRegion}
      showsUserLocation
      showsMyLocationButton
    >
      {location && (
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
      )}

      <Polyline
    coordinates={route.path}
    strokeColor="#007AFF"
    strokeWidth={5}
/>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});