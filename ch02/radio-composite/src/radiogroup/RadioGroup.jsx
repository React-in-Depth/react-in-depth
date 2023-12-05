import { useState } from "react";
import { RadioGroupContext } from "./contexts";
import { Option } from "./Option";
import { Details } from "./Details";

export function RadioGroup({ children, name, onChange }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const contextValue = {
    name,
    selectedValue,
    onChange: handleChange,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <RadioGroupContext.Provider value={contextValue}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
}

RadioGroup.Option = Option;
RadioGroup.Details = Details;
