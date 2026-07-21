import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

import { getDistanceMeters } from "../utils/geo";
import { speak, stopSpeaking } from "../services/SpeechService";

export function useRunNavigation(route: any) {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);

  const [currentTurn, setCurrentTurn] = useState(0);

  const [distanceToTurn, setDistanceToTurn] = useState(0);

  const [isFinished, setIsFinished] = useState(false);

  // Keep track of the latest turn without recreating the GPS watcher
  const currentTurnRef = useRef(0);

  // Voice announcement flags
  const announcedFirstWarning = useRef(false);
  const announcedSecondWarning = useRef(false);
  const announcedFinalWarning = useRef(false);

  useEffect(() => {
    currentTurnRef.current = currentTurn;
  }, [currentTurn]);

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    async function startTracking() {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Location permission denied");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 2,
          timeInterval: 1000,
        },
        (loc) => {
          setLocation(loc);

          const turnIndex = currentTurnRef.current;

          const nextTurn = route.landmarks[turnIndex];

          if (!nextTurn) return;

          const distance = getDistanceMeters(
            loc.coords.latitude,
            loc.coords.longitude,
            nextTurn.latitude,
            nextTurn.longitude
          );

          setDistanceToTurn(distance);

          // -------------------------------
          // Dynamic Voice Distances
          // -------------------------------

          const triggerRadius = nextTurn.radius ?? 10;

          const firstWarning = triggerRadius * 3;
          const secondWarning = triggerRadius * 1.5;
          const finalWarning = triggerRadius;

          // -------------------------------
          // Voice Navigation
          // -------------------------------

          if (
            !announcedFirstWarning.current &&
            distance <= firstWarning
          ) {
            stopSpeaking();

            speak(
              `In ${Math.round(firstWarning)} metres, ${nextTurn.instruction.toLowerCase()} onto ${nextTurn.name || "the next road"}`
            );

            announcedFirstWarning.current = true;
          }

          if (
            !announcedSecondWarning.current &&
            distance <= secondWarning
          ) {
            stopSpeaking();

            speak(
              `In ${Math.round(secondWarning)} metres, ${nextTurn.instruction.toLowerCase()}`
            );

            announcedSecondWarning.current = true;
          }

          if (
            !announcedFinalWarning.current &&
            distance <= finalWarning
          ) {
            stopSpeaking();

            speak(nextTurn.instruction);

            announcedFinalWarning.current = true;
          }

          // -------------------------------
          // Turn Detection
          // -------------------------------

          if (distance <= triggerRadius) {
            // Final turn reached
            if (turnIndex >= route.landmarks.length - 1) {
              stopSpeaking();

              speak("Route complete. Great run!");

              console.log("🏁 Route Complete");

              setIsFinished(true);

              subscription.remove();

              return;
            }

            console.log(
              `Reached Turn ${turnIndex + 1}`
            );

            currentTurnRef.current++;

            setCurrentTurn(currentTurnRef.current);

            // Reset announcements
            announcedFirstWarning.current = false;
            announcedSecondWarning.current = false;
            announcedFinalWarning.current = false;
          }
        }
      );
    }

    startTracking();

    return () => {
      subscription?.remove();
    };
  }, []);

  return {
    location,
    currentTurn,
    distanceToTurn,
    isFinished,
  };
}