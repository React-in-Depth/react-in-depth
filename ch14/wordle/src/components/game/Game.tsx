import styled from "@emotion/styled";
import { useAlert } from "../overlay";
import { Grid } from "../grid/Grid";
import { Keyboard } from "../keyboard/Keyboard";
import { Menu } from "../menu";
import { useEffect } from "react";
import { useGameMachine } from "./useGameMachine";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2em;
  height: 100vh;
`;

export function Game({
  word,
  initialGrid = [],
  onUpdate,
  onFinal,
}: {
  word: string;
  initialGrid?: string[];
  onUpdate?: (rows: string[], won?: boolean) => void;
  onFinal?: () => void;
}) {
  const alert = useAlert();
  const { grid, keyboard, error, effectComplete, submit, type, undo } =
    useGameMachine(word, initialGrid, onUpdate, onFinal);
  useEffect(() => void (error && alert(error)), [error, alert]);
  return (
    <Wrapper>
      <Menu />
      <Grid words={grid} onEffect={effectComplete} />
      <Keyboard
        statuses={keyboard}
        onKey={type}
        onEnter={submit}
        onBackspace={undo}
      />
    </Wrapper>
  );
}
