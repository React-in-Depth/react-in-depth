import { useSelector } from "react-redux";

export function useData(selector) {
  return useSelector(selector);
}
