import { useEffect, useState } from "react";
import * as Location from "expo-location";

import { getDistanceMeters } from "../utils/geo";

export function useRunNavigation(route: any) {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);

  const [currentTurn, setCurrentTurn] = useState(0);

  const [distanceToTurn, setDistanceToTurn] = useState(0);

  useEffect(() => {
    startTracking();
  }, [currentTurn]);

  async function startTracking() {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") return;

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 2,
        timeInterval: 1000,
      },
      (loc) => {
        setLocation(loc);

        const nextTurn = route.landmarks[currentTurn];

        if (!nextTurn) return;

        const distance = getDistanceMeters(
          loc.coords.latitude,
          loc.coords.longitude,
          nextTurn.latitude,
          nextTurn.longitude
        );

        setDistanceToTurn(distance);

        // 🚀 NEW: Automatically move to the next turn
        if (
          distance < 10 &&
          currentTurn < route.landmarks.length - 1
        ) {
          console.log("Turn reached!");

          setCurrentTurn((prev) => prev + 1);
        }
      }
    );

    return subscription;
  }

  return {
    location,
    currentTurn,
    distanceToTurn,
  };
}