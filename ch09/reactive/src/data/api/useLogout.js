import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as API from "./api";

export function useLogout() {
  const queryClient = useQueryClient();
  const onSuccess = () =>
    queryClient.refetchQueries({ queryKey: ["user"] });

  const { mutate: logout } = useMutation({
    mutationFn: API.logout,
    onSuccess,
  });
  return logout;
}
