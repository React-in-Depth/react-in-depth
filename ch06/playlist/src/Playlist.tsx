import { useReorderable } from "./useReorderable";
import "./playlist.css";
import { ActionType, Song } from "./types";
import { PlaylistItem } from "./PlaylistItem";
import { MouseEvent, useCallback } from "react";

interface PlaylistProps {
  songs: Song[];
}

export function Playlist({ songs }: PlaylistProps) {
  const [list, dispatch] = useReorderable(songs);

  const handleMove = useCallback(
    (index: number) => (evt: MouseEvent<HTMLButtonElement>) => {
      const type = evt.currentTarget.name as ActionType;
      dispatch({ type, index });
    },
    [dispatch]
  );

  return (
    <ol>
      {list.map((song, index) => (
        <PlaylistItem
          key={song.id}
          song={song}
          index={index}
          move={handleMove}
        />
      ))}
    </ol>
  );
}
