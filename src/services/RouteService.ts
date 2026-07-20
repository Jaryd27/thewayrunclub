import { decode } from "base-64";
import { Route } from "../types/Route";

export function getEncodedRoute(link: string): string {
  const parts = link.split("#route=");

  if (parts.length < 2) {
    throw new Error("No route found in link.");
  }

  return parts[1];
}

export function decodeRoute(encoded: string): Route {
  const json = decode(encoded);

  const compact = JSON.parse(json);

  return {
    name: compact.n,

    path: compact.p.map(([lat, lon]: number[]) => ({
      latitude: lat,
      longitude: lon,
    })),

    landmarks: compact.l.map(
      ([name, instruction, lat, lon, radius]: any[]) => ({
        name,
        instruction,
        latitude: lat,
        longitude: lon,
        radius,
      })
    ),

    updated_at: compact.u,
  };
}