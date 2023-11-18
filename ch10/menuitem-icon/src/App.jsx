import { MenuItem } from "./MenuItem";

export default function App() {
  return (
    <ul>
      <MenuItem href="/blog" label="Blog" />
      <MenuItem href="/about" label="About" />
    </ul>
  );
}
