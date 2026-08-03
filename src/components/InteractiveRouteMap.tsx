import React, { useMemo, useRef } from "react";
import MapView, {
  Marker,
  Polyline,
} from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";

import { ClubRoute } from "../routes/ClubRoutes";

import {
  getEncodedRoute,
  decodeRoute,
} from "../services/RouteService";

import TurnMarker from "./TurnMarker";

interface Props {
  route: ClubRoute;
}

export default function InteractiveRouteMap({
  route,
}: Props) {

  const mapRef = useRef<MapView>(null);

  const decodedRoute = useMemo(() => {

    const encoded = getEncodedRoute(
      route.routeLink
    );

    return decodeRoute(encoded);

  }, [route]);

  const path = decodedRoute.path;

  if (path.length === 0) {
    return null;
  }

  return (

    <View style={styles.container}>

      <MapView
        ref={mapRef}
        style={styles.map}

        scrollEnabled
        zoomEnabled
        rotateEnabled={false}
        pitchEnabled={false}

        toolbarEnabled={false}

        showsCompass={false}
        showsScale={false}

        initialRegion={{
          latitude: path[0].latitude,
          longitude: path[0].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}

        onMapReady={() => {

          mapRef.current?.fitToCoordinates(path, {

            edgePadding: {
              top: 50,
              bottom: 50,
              left: 50,
              right: 50,
            },

            animated: true,

          });

        }}

      >

        <Polyline
          coordinates={path}
          strokeWidth={5}
          strokeColor="#2563EB"
        />

        {/* START */}

        <Marker coordinate={path[0]}>

          <View style={styles.startMarker}>
            <Text style={styles.markerText}>
              START
            </Text>
          </View>

        </Marker>

        {/* FINISH */}

        <Marker
          coordinate={path[path.length - 1]}
        >

          <View style={styles.finishMarker}>
            <Text style={styles.finishText}>
              🏁
            </Text>
          </View>

        </Marker>

        {/* TURNS */}

        {decodedRoute.landmarks.map(
          (turn, index) => (

            <Marker
              key={index}
              coordinate={{
                latitude: turn.latitude,
                longitude: turn.longitude,
              }}
            >

              <TurnMarker
                number={index + 1}
              />

            </Marker>

          )
        )}

      </MapView>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    marginTop: 20,

    height: 320,

    borderRadius: 22,

    overflow: "hidden",

  },

  map: {

    flex: 1,

  },

  startMarker: {

    backgroundColor: "#22C55E",

    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 18,

    borderWidth: 2,

    borderColor: "white",

  },

  markerText: {

    color: "white",

    fontWeight: "700",

    fontSize: 11,

  },

  finishMarker: {

    width: 40,

    height: 40,

    borderRadius: 20,

    backgroundColor: "white",

    justifyContent: "center",

    alignItems: "center",

    borderWidth: 2,

    borderColor: "#111827",

  },

  finishText: {

    fontSize: 20,

  },

});