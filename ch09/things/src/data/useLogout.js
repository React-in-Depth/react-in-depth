import { useData } from "./useData";

export function useLogout() {
  const logout = useData(({ actions }) => actions.logout);
  return logout;
}
