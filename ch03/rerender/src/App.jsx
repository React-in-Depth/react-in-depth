import { NoRerenderWithPropsChange } from "./NoRerenderWithPropsChange";
import { RerenderWithoutPropsChange } from "./RerenderWithoutPropsChange";

export default function App() {
  return (
    <main>
      <h4>Re-renders without changing properties</h4>
      <RerenderWithoutPropsChange />
      <h4>No re-render with changing properties</h4>
      <NoRerenderWithPropsChange />
    </main>
  );
}
