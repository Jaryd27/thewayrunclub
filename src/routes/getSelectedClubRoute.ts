import { clubRoutes } from "./ClubRoutes";
import { getSelectedRoute } from "../storage/SelectedRoute";

export async function getSelectedClubRoute() {
  const selectedId = await getSelectedRoute();

  if (!selectedId) {
    return clubRoutes[0];
  }

  const route = clubRoutes.find(
    (r) => r.id === selectedId
  );

  return route ?? clubRoutes[0];
}