import { sampleRouteLink } from "./SampleRoute";

export interface ClubRoute {
  id: string;
  name: string;
  distance: number;
  turns: number;
  routeLink: string;
}

export const clubRoutes: ClubRoute[] = [
  {
    id: "saturday",
    name: "Saturday Club Route",
    distance: 8.2,
    turns: 35,
    routeLink: sampleRouteLink,
  },

  {
    id: "tempo",
    name: "Tempo Thursday",
    distance: 6.1,
    turns: 24,
    routeLink: sampleRouteLink,
  },

  {
    id: "recovery",
    name: "Sunday Recovery",
    distance: 4.8,
    turns: 18,
    routeLink: sampleRouteLink,
  },
];