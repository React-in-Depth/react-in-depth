import { useData } from "./useData";

export function useLoginSignup() {
  const login = useData(({ actions }) => actions.login);
  const signup = useData(({ actions }) => actions.signup);
  return { login, signup };
}
