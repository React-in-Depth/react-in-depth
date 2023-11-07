import { useGameDataContext } from "./context";

export function useGameData() {
  const { wordInfo, profile, updateState, showResults } =
    useGameDataContext();

  return {
    updateState,
    showResults,
    initialGrid: profile?.today.rows,
    word: wordInfo?.word || "",
  };
}
