import TaskCard from "./TaskCard";
import React from "react";

export default function Column({ title, color, statusKey, tasks, moveTask, deleteTask, clearColumn }) {
  return (
    <section className="column">
      <div
        className="column-header"
        style={{ borderBottom: `4px solid ${color}` }}
      >
        <h2>
          {title}{" "}
          <span className="counter" style={{ background: color }}>
            ({tasks.length})
          </span>
        </h2>

        <button className="small danger" onClick={() => clearColumn(statusKey)}>
          🗑
        </button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty">Aucune tâche</div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              moveTask={moveTask}
              deleteTask={deleteTask}
              color={color}
            />
          ))
        )}
      </div>
    </section>
  );
}
