import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Colors } from "../theme/colors";

const { height } = Dimensions.get("window");

const logo = require("../assets/images/logo.jpeg");

export default function HeroSection() {
  return (
    <View style={styles.container}>

      <Image
        source={logo}
        resizeMode="contain"
        style={styles.logo}
      />

      <Text style={styles.title}>
        The Way
      </Text>

      <Text style={styles.slogan}>
        Not about speed,{"\n"}
        about direction.
      </Text>

      <Text style={styles.scroll}>
        Scroll Down
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    height: height * 0.92,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 30,
  },

  logo: {
    width: 280,
    height: 280,
  },

  title: {
    marginTop: 20,

    fontSize: 42,

    color: Colors.text,

    fontWeight: "700",

    fontFamily: "Georgia",
  },

  slogan: {
    marginTop: 18,

    fontSize: 22,

    textAlign: "center",

    color: Colors.textSecondary,

    fontStyle: "italic",

    lineHeight: 34,
  },

  scroll: {
    position: "absolute",

    bottom: 90,

    fontSize: 13,

    color: Colors.textSecondary,

    letterSpacing: 1,
  },

});