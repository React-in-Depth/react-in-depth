import {
  BiSolidUpArrowAlt as Up,
  BiSolidDownArrowAlt as Down,
  BiSolidArrowToTop as First,
  BiSolidArrowToBottom as Last,
} from "react-icons/bi";
import { Song } from "./types";
import { MouseEvent, memo } from "react";

interface PlaylistItemProps {
  song: Song;
  index: number;
  move: (index: number) => (evt: MouseEvent<HTMLButtonElement>) => void;
}

export const PlaylistItem = memo(function PlaylistItem({
  song,
  index,
  move,
}: PlaylistItemProps) {
  const onClick = move(index);
  return (
    <li>
      <span>{index + 1}</span>
      <p>
        <strong>{song.title}</strong> by <em>{song.artist}</em>
      </p>
      <button name="up" onClick={onClick}>
        <Up />
      </button>
      <button name="down" onClick={onClick}>
        <Down />
      </button>
      <button name="first" onClick={onClick}>
        <First />
      </button>
      <button name="last" onClick={onClick}>
        <Last />
      </button>
    </li>
  );
});
