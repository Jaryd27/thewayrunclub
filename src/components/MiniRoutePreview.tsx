import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../theme/colors";

export default function MiniRoutePreview() {
  return (
    <View style={styles.container}>

      <Text style={styles.icon}>
        🗺
      </Text>

      <Text style={styles.title}>
        Route Preview
      </Text>

      <Text style={styles.subtitle}>
        Live route preview coming soon
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,

    borderRadius: 24,

    backgroundColor: Colors.surface,

    borderWidth: 1,

    borderColor: Colors.border,

    justifyContent: "center",

    alignItems: "center",
  },

  icon: {
    fontSize: 42,
  },

  title: {
    marginTop: 14,

    fontSize: 18,

    fontWeight: "700",

    color: Colors.text,
  },

  subtitle: {
    marginTop: 8,

    color: Colors.textSecondary,

    fontSize: 15,
  },
});