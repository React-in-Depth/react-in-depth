import { Status } from "../../types";
import { Key } from "./Key";

export default {
  title: "Components/Key",
  component: Key,
  argTypes: { onClick: { action: "key press" } },
};

export const Unknown = { args: { status: Status.Unknown, char: "a" } };

export const Unused = { args: { status: Status.Unused, char: "b" } };

export const Used = { args: { status: Status.Used, char: "c" } };

export const Correct = { args: { status: Status.Correct, char: "d" } };

export const Enter = {
  args: { status: Status.Unknown, char: "⏎", isLarge: true },
};

export const Backspace = {
  args: { status: Status.Unknown, char: "⌫", isLarge: true },
};
