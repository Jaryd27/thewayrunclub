import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../theme/colors";

interface Props {
  icon: string;
  title: string;
  value: string;
}

export default function StatCard({
  icon,
  title,
  value,
}: Props) {
  return (
    <View style={styles.card}>

      <Text style={styles.icon}>
        {icon}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    flex: 1,

    backgroundColor: Colors.surface,

    borderRadius: 18,

    paddingVertical: 18,

    paddingHorizontal: 10,

    alignItems: "center",

    borderWidth: 1,

    borderColor: Colors.border,
  },

  icon: {
    fontSize: 24,
  },

  title: {
    marginTop: 8,

    fontSize: 12,

    fontWeight: "600",

    color: Colors.textSecondary,

    textAlign: "center",
  },

  value: {
    marginTop: 8,

    fontSize: 17,

    fontWeight: "700",

    color: Colors.text,

    textAlign: "center",
  },

});