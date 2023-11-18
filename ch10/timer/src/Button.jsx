import { memo } from "react";

export const Button = memo(function Button({ icon, label, ...rest }) {
  return (
    <button title={label} className="toggle" {...rest}>
      <img src={`icons/${icon}.svg`} alt={label} />
    </button>
  );
});
