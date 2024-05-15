import { useQuery } from "@tanstack/react-query";
import { loadThings } from "./api/api";

export function useAllThings() {
  const { data = [] } = useQuery({
    queryKey: ["things"],
    queryFn: loadThings,
  });
  return data.map(({ id }) => id) || [];
}
