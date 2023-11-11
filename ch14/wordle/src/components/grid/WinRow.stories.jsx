import { Status } from "../../types";
import { WinRow } from "./WinRow";

export default {
  title: "Components/WinRow",
  component: WinRow,
  argTypes: { onEffect: { action: "winning complete" } },
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
