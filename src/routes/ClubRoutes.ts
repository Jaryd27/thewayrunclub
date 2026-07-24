import { sampleRouteLink } from "./SampleRoute";

export interface ClubRoute {
  id: string;

  name: string;

  description: string;

  distance: number;

  elevationGain: number;

  turns: number;

  difficulty: "Easy" | "Moderate" | "Challenging";

  route: string;
}

export const clubRoutes: ClubRoute[] = [
  {
    id: "saturday",

    name: "Saturday Club Route",

    description:
      "A flowing suburban route with rolling hills that's perfect for the weekly club run.",

    distance: 8.2,

    elevationGain: 145,

    turns: 35,

    difficulty: "Moderate",

    route: sampleRouteLink,
  },

  {
    id: "tempo",

    name: "Tempo Thursday",

    description:
      "Fast roads with long straights designed for tempo efforts and interval sessions.",

    distance: 6.1,

    elevationGain: 82,

    turns: 24,

    difficulty: "Easy",

    route: sampleRouteLink,
  },

  {
    id: "recovery",

    name: "Sunday Recovery",

    description:
      "A relaxed route through quiet neighbourhood roads, ideal for recovery days.",

    distance: 4.8,

    elevationGain: 38,

    turns: 18,

    difficulty: "Easy",

    route: sampleRouteLink,
  },
];