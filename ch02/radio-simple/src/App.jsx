import { useState } from "react";
import { RadioGroup } from "./RadioGroup";

export default function App() {
  const [data, setData] = useState({
    meal: "",
    bread: "",
    side: "",
    beverage: "",
  });
  const onChange = (name) => (value) =>
    setData({ ...data, [name]: value });
  return (
    <main>
      <h1>Breakfast order form</h1>
      <h2>Meal</h2>
      <RadioGroup
        name="meal"
        options={["Small: $5.99", "Medium: $7.99", "Large: $9.99"]}
        onChange={onChange("meal")}
      />
      <h2>Bread</h2>
      <RadioGroup
        name="bread"
        options={["Bagel", "Roll", "Croissant"]}
        onChange={onChange("bread")}
      />
      <h2>Side</h2>
      <RadioGroup
        name="side"
        options={["Avocado", "Bacon"]}
        onChange={onChange("side")}
      />
      <h2>Beverage</h2>
      <RadioGroup
        name="beverage"
        options={["Orange Juice", "Coffee"]}
        onChange={onChange("beverage")}
      />
    </main>
  );
}
