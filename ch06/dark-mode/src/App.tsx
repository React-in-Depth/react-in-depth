import {
  useContext,
  useState,
  createContext,
  memo,
  PropsWithChildren,
  ComponentPropsWithoutRef,
} from "react";

interface DarkMode {
  mode: "light" | "dark";
  toggle: () => void;
}

const DarkModeContext = createContext<DarkMode | null>(null);
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error(
      "useDarkMode must be wrapped in DarkModeContext.Provider"
    );
  }
  return context;
}

function Button({
  children,
  ...rest
}: PropsWithChildren<ComponentPropsWithoutRef<"button">>) {
  const { mode } = useDarkMode();
  const style = {
    backgroundColor: mode === "dark" ? "#333" : "#CCC",
    border: "1px solid",
    color: "inherit",
  };
  return (
    <button style={style} {...rest}>
      {children}
    </button>
  );
}

function ToggleButton() {
  const { toggle } = useDarkMode();
  return <Button onClick={toggle}>Toggle mode</Button>;
}

const Header = memo(function Header() {
  const style = {
    padding: "10px 5px",
    borderBottom: "1px solid",
    marginBottom: "10px",
    display: "flex",
    gap: "5px",
    justifyContent: "flex-end",
  };
  return (
    <header style={style}>
      <Button>Products</Button>
      <Button>Services</Button>
      <Button>Pricing</Button>
      <ToggleButton />
    </header>
  );
});

const Main = memo(function Main() {
  const { mode } = useDarkMode();
  const style = {
    color: mode === "dark" ? "white" : "black",
    backgroundColor: mode === "dark" ? "black" : "white",
    margin: "-8px",
    minHeight: "100vh",
    boxSizing: "border-box",
  } as const;
  return (
    <main style={style}>
      <Header />
      <h1>Welcome to our business site!</h1>
    </main>
  );
});

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const toggle = () =>
    setMode((v) => (v === "light" ? "dark" : "light"));
  const contextValue = { mode, toggle };
  return (
    <DarkModeContext.Provider value={contextValue}>
      <Main />
    </DarkModeContext.Provider>
  );
}

export default App;
