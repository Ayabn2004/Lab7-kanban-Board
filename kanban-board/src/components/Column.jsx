import TaskCard from "./TaskCard";

export default function Column({ title, tasks, moveTask, deleteTask }) {
  return (
    <div className="column">
      <h2>
        {title} <span className="counter">({tasks.length})</span>
      </h2>

      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}
