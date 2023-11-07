import styled from "@emotion/styled";
import { RevealingGridWord } from "../../types";
import { Cell } from "./Cell";
import { RowElement } from "./Row";
import { useEffectMachine } from "./useEffectMachine";

const CollapsibleCell = styled(Cell)<{ $isCollapsed: boolean }>`
  scale: 1 ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};
  transition: scale 0.2s linear;
`;

interface RevealRowProps
  extends Pick<RevealingGridWord, "word" | "statuses"> {
  onEffect?: () => void;
}

export function RevealRow({
  word,
  onEffect,
  statuses,
}: RevealRowProps) {
  const characters = word.split("");
  const { active, counter, next } = useEffectMachine(onEffect);
  return (
    <RowElement>
      {characters.map((key, index) => (
        <CollapsibleCell
          key={index}
          char={key}
          $isCollapsed={active === index}
          onTransitionEnd={
            active === index || index === 4 ? next : undefined
          }
          status={counter > index ? statuses[index] : undefined}
        />
      ))}
    </RowElement>
  );
}
