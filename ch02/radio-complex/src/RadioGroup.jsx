import { useState } from "react";

export function RadioGroup({ name, options, onChange }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {options.map((option, index) => (
        <label
          key={index}
          style={option.isPopular ? { border: "1px dashed red" } : null}
        >
          {option.icon && <span>{option.icon} </span>}
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
          />
          {option.label}
          {option.postfix && <em> {option.postfix}</em>}
          {selectedValue === option.value && option.details}
          {option.isPopular ? <strong>🔥 Popular!</strong> : null}
        </label>
      ))}
    </div>
  );
}
