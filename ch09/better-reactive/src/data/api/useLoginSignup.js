import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as API from "./api";

export function useLoginSignup() {
  const queryClient = useQueryClient();
  const setUser = (user) => queryClient.setQueryData(["user"], user);
  const { mutate: login } = useMutation({
    mutationFn: API.login,
    onSuccess: setUser,
  });
  const { mutate: signup } = useMutation({
    mutationFn: API.signup,
    onSuccess: setUser,
  });
  return { login, signup };
}
