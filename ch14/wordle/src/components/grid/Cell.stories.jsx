import { Status } from "../../types";
import { Cell } from "./Cell";

export default {
  title: "Components/Cell",
  component: Cell,
};

export const Empty = { args: { char: " " } };

export const Unknown = { args: { char: "a" } };

export const Unused = { args: { status: Status.Unused, char: "b" } };

export const Used = { args: { status: Status.Used, char: "c" } };

export const Correct = { args: { status: Status.Correct, char: "d" } };
