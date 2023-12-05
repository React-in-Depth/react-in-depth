import { useMemo } from "react";

export function useAPI() {
  return useMemo(
    () => ({
      fetchUser: (userId) =>
        fetch(`https://api.company.invalid/users/${userId}`),
    }),
    []
  );
}
