import { QueryClient, QueryClientProvider } from "react-query";
import { Loader } from "./Loader";

const queryClient = new QueryClient();

export function DataProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Loader />
      {children}
    </QueryClientProvider>
  );
}
