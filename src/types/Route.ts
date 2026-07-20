export interface RoutePoint {
  latitude: number;
  longitude: number;
}

export interface Landmark {
  name: string;
  instruction: string;
  latitude: number;
  longitude: number;
  radius: number;
}

export interface Route {
  name: string;
  path: RoutePoint[];
  landmarks: Landmark[];
  updated_at?: string;
}