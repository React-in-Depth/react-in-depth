import { Status } from "../types";

export function getLabel(label: string, status: Status) {
  if (status === Status.Unknown) {
    return label;
  }
  return [label, status].join(" ");
}
