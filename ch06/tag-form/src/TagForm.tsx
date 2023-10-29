import { useState } from "react";

interface TagFormProps {
  onTagsChanged: (tags: string[]) => void;
}

export function TagForm({ onTagsChanged }: TagFormProps) {
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTags((oldTags) => [...oldTags, newTag]);
    setNewTag("");
    onTagsChanged([...tags, newTag]);
  };
  return (
    <form onSubmit={onSubmit}>
      <label>
        New tag:
        <input
          type="text"
          value={newTag}
          onChange={({ target: { value } }) => setNewTag(value)}
        />
      </label>
      <button type="submit">Add</button>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </form>
  );
}
