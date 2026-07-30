import React, { useMemo } from "react";
import MapView, {
  Marker,
  Polyline,
} from "react-native-maps";
import {
  StyleSheet,
  View,
} from "react-native";

import { ClubRoute } from "../routes/ClubRoutes";

import {
  getEncodedRoute,
  decodeRoute,
} from "../services/RouteService";

interface Props {
  route: ClubRoute;
}

export default function InteractiveRouteMap({
  route,
}: Props) {

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
      >

        <Polyline
          coordinates={path}
          strokeWidth={5}
          strokeColor="#2563EB"
        />

        <Marker coordinate={path[0]} />

        <Marker coordinate={path[path.length - 1]} />

      </MapView>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    marginTop: 20,

    height: 300,

    borderRadius: 22,

    overflow: "hidden",
  },

  map: {
    flex: 1,
  },

});