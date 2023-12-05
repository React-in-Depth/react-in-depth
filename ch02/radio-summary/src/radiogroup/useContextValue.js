import { useState } from "react";

export function useContextValue({ name, onChange }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return {
    name,
    selectedValue,
    onChange: handleChange,
  };
}
