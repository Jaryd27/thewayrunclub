import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import Screen from "../components/Screen";
import RouteCard from "../components/RouteCard";

import { Colors } from "../theme/colors";
import { FontSize } from "../theme/typography";

import { clubRoutes } from "../routes/ClubRoutes";

export default function RoutesScreen() {
  const [selectedRoute, setSelectedRoute] = useState(
    clubRoutes[0].id
  );

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
              onPress={() => setSelectedRoute(item.id)}
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