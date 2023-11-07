import styled from "@emotion/styled";
import { Row } from "./Row";
import { RevealRow } from "./RevealRow";
import { GridWord, RowType } from "../../types";
import { WinRow } from "./WinRow";

const GridElement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

interface GridRowProps {
  row: GridWord;
  onEffect?: () => void;
}

function GridRow({ row, onEffect }: GridRowProps) {
  switch (row.type) {
    case RowType.Winning:
      return <WinRow {...row} onEffect={onEffect} />;
    case RowType.Revealing:
      return <RevealRow {...row} onEffect={onEffect} />;
    case RowType.Empty:
      return <Row word="" />;
    default:
      return <Row {...row} />;
  }
}

interface GridProps {
  words?: GridWord[];
  onEffect: () => void;
}

export function Grid({ words = [], onEffect }: GridProps) {
  const rows: GridWord[] = words
    .concat()
    .reverse()
    .concat(
      Array.from(Array(6 - words.length)).fill({ type: RowType.Empty })
    );
  const lastWord = words.length;
  return (
    <GridElement>
      {rows.map((row, i) => (
        <GridRow
          key={i}
          row={row}
          onEffect={i + 1 === lastWord ? onEffect : undefined}
        />
      ))}
    </GridElement>
  );
}
