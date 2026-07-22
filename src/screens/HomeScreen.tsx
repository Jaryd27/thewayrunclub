import React from "react";
import { ScrollView } from "react-native";

import Screen from "../components/Screen";
import HeroSection from "../components/HeroSection";
import Dashboard from "../components/Dashboard";

export default function HomeScreen() {
  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <HeroSection />

        <Dashboard />

      </ScrollView>
    </Screen>
  );
}