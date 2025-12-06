import { useState } from "react";
import TaskForm from "./components/TaskForm";
import Column from "./components/Column";
import "./styles.css";

export default function App() {
  const [tasks, setTasks] = useState([]);

  // Ajouter une tâche
  const addTask = (title, description) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      status: "todo",
    };
    setTasks([newTask, ...tasks]);
  };

  // Déplacer tâche gauche/droite
  const moveTask = (id, direction) => {
    const order = ["todo", "inprogress", "done"];

    setTasks(tasks.map(task => {
      if (task.id !== id) return task;

      const currentIndex = order.indexOf(task.status);
      const newIndex = currentIndex + direction;

      if (newIndex < 0 || newIndex >= order.length) return task;

      return { ...task, status: order[newIndex] };
    }));
  };

  // Supprimer une tâche
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <h1>Kanban Board</h1>

      <TaskForm onAdd={addTask} />

      <div className="board">
        <Column 
          title="To Do" 
          tasks={tasks.filter(t => t.status === "todo")}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />
        <Column 
          title="In Progress" 
          tasks={tasks.filter(t => t.status === "inprogress")}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />
        <Column 
          title="Done" 
          tasks={tasks.filter(t => t.status === "done")}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
