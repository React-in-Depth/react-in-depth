import { useContext } from "react";
import { DataContext } from "./DataContext";

export function useSend() {
  return useContext(DataContext).send;
}
