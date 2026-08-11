import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../theme/colors";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function ExpandableSection({
  title,
  children,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const animation = useRef(new Animated.Value(0)).current;

  function toggle() {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  }

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 650],
  });

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View>

      <TouchableOpacity
        style={styles.header}
        onPress={toggle}
        activeOpacity={0.8}
      >

        <Text style={styles.title}>
          {title}
        </Text>

        <Animated.Text
          style={[
            styles.arrow,
            {
              transform: [{ rotate }],
            },
          ]}
        >
          ▼
        </Animated.Text>

      </TouchableOpacity>

      <Animated.View
        style={[
          styles.content,
          {
            height,
          },
        ]}
      >
        {children}
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    marginTop: 26,

    paddingVertical: 18,

    borderTopWidth: 1,

    borderBottomWidth: 1,

    borderColor: Colors.border,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  title: {
    fontSize: 18,

    fontWeight: "700",

    color: Colors.primary,
  },

  arrow: {
    fontSize: 18,

    color: Colors.primary,
  },

  content: {
    overflow: "hidden",
  },

});