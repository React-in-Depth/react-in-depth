import styled from "styled-components";
import { useLogout } from "../data";
import { Button } from "./Button";

const LogoutButton = styled(Button)`
  display: flex;
  align-self: flex-end;
`;

export function Logout() {
  const logout = useLogout();
  return <LogoutButton onClick={logout}>Log out</LogoutButton>;
}
