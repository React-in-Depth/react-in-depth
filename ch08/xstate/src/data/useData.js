import { useContext } from "react";
import { DataContext } from "./DataContext";
import { useSelector } from "@xstate/react";

export function useData(selector) {
  const service = useContext(DataContext);
  return useSelector(service, selector);
}
