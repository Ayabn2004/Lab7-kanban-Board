export default function TaskCard({ task, moveTask, deleteTask }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <div className="buttons">
        <button onClick={() => moveTask(task.id, -1)}>◀</button>
        <button onClick={() => moveTask(task.id, +1)}>▶</button>
        <button onClick={() => deleteTask(task.id)}>🗑</button>
      </div>
    </div>
  );
}
