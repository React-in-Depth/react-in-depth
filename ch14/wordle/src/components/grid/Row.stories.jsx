import { Status } from "../../types";
import { Row } from "./Row";

export default {
  title: "Components/Row",
  component: Row,
};

export const Empty = {};

export const Partial = { args: { word: "tra" } };

export const InputWord = { args: { word: "trace" } };

export const InputWithError = {
  args: { word: "tracc", isError: true },
};

export const GuessedWord = {
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
