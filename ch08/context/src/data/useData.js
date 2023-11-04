import { useContext } from "react";
import { DataContext } from "./DataContext";

export function useData() {
  return useContext(DataContext);
}
