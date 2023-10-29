import { PropsWithChildren } from "react";
import "./Rating.css";

interface StarsProps {
  count: number;
  faded?: boolean;
}

function Stars({
  count,
  faded = false,
  children,
}: PropsWithChildren<StarsProps>) {
  return (
    <span className={`rating__stars ${faded && "rating__stars--faded"}`}>
      {Array.from(Array(count).keys()).map((_, i) => (
        <span key={i} className="rating__star">
          {children}
        </span>
      ))}
    </span>
  );
}

interface RatingProps {
  icon?: string;
  value: number;
  max?: number;
  label?: string;
}

export function Rating({
  icon = "⭐",
  value,
  max = 5,
  label = "",
}: RatingProps) {
  const percentage = Math.round((value / max) * 100);
  return (
    <div className="rating" title={label}>
      <Stars faded count={max}>
        {icon}
      </Stars>
      <div className="rating__overlay" style={{ width: `${percentage}%` }}>
        <Stars count={max}>{icon}</Stars>
      </div>
    </div>
  );
}
