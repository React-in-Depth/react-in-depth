import { useQueryClient, useMutation } from "react-query";
import * as API from "./api";

export function useLogout() {
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.refetchQueries(["user"]);
  const { mutate: logout } = useMutation(API.logout, { onSuccess });
  return logout;
}
