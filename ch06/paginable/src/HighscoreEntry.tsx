import "./highscore.css";
import { Entry } from "./types";

interface EntryProps {
  item: Entry;
  index: number;
}

export function HighscoreEntry({ item, index }: EntryProps) {
  return (
    <div className="highscore-entry">
      <p className="highscore-entry__pos">{index + 1}</p>
      <p className="highscore-entry__name">{item.name}</p>
      <p className="highscore-entry__points">
        {item.points.toLocaleString("en-US")} points
      </p>
    </div>
  );
}
