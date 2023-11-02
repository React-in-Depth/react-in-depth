export interface Song {
  id: number;
  title: string;
  artist: string;
}

export type Action =
  | { type: "up"; index: number }
  | { type: "down"; index: number }
  | { type: "first"; index: number }
  | { type: "last"; index: number };

export type ActionType = Action["type"];
