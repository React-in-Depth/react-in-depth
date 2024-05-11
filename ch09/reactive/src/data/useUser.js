import { useQuery } from "react-query";
import { getUser } from "./api/api";

export function useUser() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return data;
}
