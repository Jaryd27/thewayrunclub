import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "selectedRoute";

export async function saveSelectedRoute(routeId: string) {
  try {
    await AsyncStorage.setItem(KEY, routeId);
  } catch (e) {
    console.log(e);
  }
}

export async function getSelectedRoute() {
  try {
    return await AsyncStorage.getItem(KEY);
  } catch (e) {
    console.log(e);
    return null;
  }
}