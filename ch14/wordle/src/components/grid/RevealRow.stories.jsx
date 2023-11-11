import { Status } from "../../types";
import { RevealRow } from "./RevealRow";

export default {
  title: "Components/RevealRow",
  component: RevealRow,
  argTypes: { onEffect: { action: "reveal complete" } },
};

export const AllWrong = {
  args: {
    word: "trace",
    statuses: [
      Status.Unused,
      Status.Unused,
      Status.Unused,
      Status.Unused,
      Status.Unused,
    ],
  },
};

export const MixedResult = {
  args: {
    word: "trace",
    statuses: [
      Status.Correct,
      Status.Unused,
      Status.Used,
      Status.Unused,
      Status.Used,
    ],
  },
};

export const MultiLetter = {
  args: {
    word: "melee",
    statuses: [
      Status.Used,
      Status.Used,
      Status.Unused,
      Status.Correct,
      Status.Unused,
    ],
  },
};

export const CorrectWord = {
  args: {
    word: "trace",
    statuses: [
      Status.Correct,
      Status.Correct,
      Status.Correct,
      Status.Correct,
      Status.Correct,
    ],
  },
};
