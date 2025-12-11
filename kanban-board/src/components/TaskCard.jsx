import React from "react";

const fmt = iso => {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return "";
  }
};

export default function TaskCard({ task, moveTask, deleteTask, color }) {

  return (
    <article className="task-card">
      <div className="task-top">
        <div className="task-badge" style={{ background: color }} />
        <div className="task-meta">
          <h3>{task.title}</h3>
        </div>
      </div>

      <p className="task-desc">
        {task.description || <span className="muted">No description</span>}
      </p>

      <div className="task-dates">
        <small>Créée : {fmt(task.createdAt)}</small>
        <small>MAJ : {fmt(task.updatedAt)}</small>
      </div>

      <div className="buttons">
        <button onClick={() => moveTask(task.id, -1)}>◀️</button>
        <button onClick={() => moveTask(task.id, +1)}>▶️</button>
        <button className="danger" onClick={() => deleteTask(task.id)}>🗑</button>
      </div>
    </article>
  );
}