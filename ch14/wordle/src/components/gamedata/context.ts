import { createContext, useContext } from "react";
import { Profile, WordInfo } from "../../types";

interface GameData {
  profile: Profile;
  wordInfo: WordInfo;
  updateState: (rows: string[], win?: boolean) => void;
  showResults: () => void;
  showWelcome: () => void;
}

export const GameDataContext = createContext<GameData | null>(null);

export function useGameDataContext() {
  const gameData = useContext(GameDataContext);
  if (!gameData) {
    throw new Error(
      "useGameData must be used within a GameDataProvider"
    );
  }
  return gameData;
}
