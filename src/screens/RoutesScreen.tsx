import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import Screen from "../components/Screen";
import RouteCard from "../components/RouteCard";

import { Colors } from "../theme/colors";
import { FontSize } from "../theme/typography";

import { clubRoutes } from "../routes/ClubRoutes";

import {
  saveSelectedRoute,
  getSelectedRoute,
} from "../storage/SelectedRoute";

export default function RoutesScreen() {
  const [selectedRoute, setSelectedRoute] = useState(
    clubRoutes[0].id
  );

  useFocusEffect(
    useCallback(() => {
      async function loadSelectedRoute() {
        const saved = await getSelectedRoute();

        if (saved) {
          setSelectedRoute(saved);
        }
      }

      loadSelectedRoute();
    }, [])
  );

  async function selectRoute(id: string) {
    setSelectedRoute(id);
    await saveSelectedRoute(id);
  }

  return (
    <Screen>
      <View style={styles.container}>

        <Text style={styles.title}>
          Explore Routes
        </Text>

        <Text style={styles.subtitle}>
          Club Routes
        </Text>

        <FlatList
          data={clubRoutes}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <RouteCard
              route={item}
              selected={selectedRoute === item.id}
              onPress={() => selectRoute(item.id)}
            />
          )}
        />

      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  title: {
    fontSize: FontSize.title,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 10,
    marginBottom: 25,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
  },
});