import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim());
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <input
        placeholder="Task title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        placeholder="Description..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button className="primary">Add</button>
    </form>
  );
}