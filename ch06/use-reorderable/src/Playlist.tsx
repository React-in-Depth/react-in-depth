import {
  BiSolidUpArrowAlt as Up,
  BiSolidDownArrowAlt as Down,
  BiSolidArrowToTop as Top,
  BiSolidArrowToBottom as Bottom,
} from "react-icons/bi";

import { useReorderable } from "./useReorderable";
import "./playlist.css";

interface Song {
  id: number;
  title: string;
  artist: string;
}
interface PlaylistProps {
  songs: Song[];
}

export function Playlist({ songs }: PlaylistProps) {
  const { list, moveUp, moveDown, moveToBottom, moveToTop } =
    useReorderable(songs);
  return (
    <ol>
      {list.map((song, index) => (
        <li key={song.id}>
          <span>{index + 1}</span>
          <p>
            <strong>{song.title}</strong> by <em>{song.artist}</em>
          </p>
          <button onClick={() => moveUp(index)}>
            <Up />
          </button>
          <button onClick={() => moveDown(index)}>
            <Down />
          </button>
          <button onClick={() => moveToTop(index)}>
            <Top />
          </button>
          <button onClick={() => moveToBottom(index)}>
            <Bottom />
          </button>
        </li>
      ))}
    </ol>
  );
}
