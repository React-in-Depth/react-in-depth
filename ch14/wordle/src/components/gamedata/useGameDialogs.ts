import { useGameDataContext } from "./context";

export function useGameDialogs() {
  const { showResults, showWelcome } = useGameDataContext();

  return {
    showResults: () => showResults?.(),
    showWelcome: () => showWelcome?.(),
  };
}
