import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as API from "./api";

export function useLoginSignup() {
  const queryClient = useQueryClient();
  const onSuccess = () =>
    queryClient.invalidateQueries({ queryKey: ["user"] });
  const { mutate: login } = useMutation({
    mutationFn: API.login,
    onSuccess,
  });
  const { mutate: signup } = useMutation({
    mutationFn: API.signup,
    onSuccess,
  });
  return { login, signup };
}
