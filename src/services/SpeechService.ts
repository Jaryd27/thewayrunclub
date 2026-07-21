import * as Speech from "expo-speech";

export function speak(text: string) {
  Speech.speak(text, {
    language: "en-ZA",
    pitch: 1,
    rate: 0.95,
  });
}

export function stopSpeaking() {
  Speech.stop();
}