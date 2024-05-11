import { useQueryClient, useMutation } from "react-query";
import * as API from "./api";

export function useLogout() {
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.setQueryData(["user"], null);
  const { mutate: logout } = useMutation(API.logout, { onSuccess });
  return logout;
}
