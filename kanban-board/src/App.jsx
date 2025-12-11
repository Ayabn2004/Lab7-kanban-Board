import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import Column from "./components/Column";
import "./styles.css";
import React from "react";


const ORDER = ["todo", "inprogress", "done"];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const raw = localStorage.getItem("kanban_tasks_v1");
    return raw ? JSON.parse(raw) : [];
  });

  const [dark, setDark] = useState(() => {
    const raw = localStorage.getItem("kanban_dark_v1");
    return raw ? JSON.parse(raw) : false;
  });

  useEffect(() => {
    localStorage.setItem("kanban_tasks_v1", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("kanban_dark_v1", JSON.stringify(dark));
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const addTask = (title, description) => {
    const now = new Date().toISOString();
    setTasks(prev => [
      {
        id: Date.now(),
        title,
        description,
        status: "todo",
        createdAt: now,
        updatedAt: now,
      },
      ...prev
    ]);
  };

  const moveTask = (id, direction) => {
    const now = new Date().toISOString();

    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task;

        const index = ORDER.indexOf(task.status);
        const newIndex = index + direction;

        if (newIndex < 0 || newIndex >= ORDER.length) return task;

        return {
          ...task,
          status: ORDER[newIndex],
          updatedAt: now
        };
      })
    );
  };

  const deleteTask = id => {
    const now = new Date().toISOString();
    setTasks(prev =>
      prev
        .map(t => (t.id === id ? { ...t, updatedAt: now } : t))
        .filter(t => t.id !== id)
    );
  };

  const clearColumn = status => {
    const now = new Date().toISOString();
    setTasks(prev =>
      prev
        .map(t =>
          t.status === status ? { ...t, updatedAt: now } : t
        )
        .filter(t => t.status !== status)
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="title-row">
          <h1>Kanban Board</h1>

          <button className="dark-btn" onClick={() => setDark(d => !d)}>
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      <TaskForm onAdd={addTask} />

      <div className="board">
        <Column
          title="To Do"
          statusKey="todo"
          color="#007bff"
          tasks={tasks.filter(t => t.status === "todo")}
          moveTask={moveTask}
          deleteTask={deleteTask}
          clearColumn={clearColumn}
        />

        <Column
          title="In Progress"
          statusKey="inprogress"
          color="#f8b400"
          tasks={tasks.filter(t => t.status === "inprogress")}
          moveTask={moveTask}
          deleteTask={deleteTask}
          clearColumn={clearColumn}
        />

        <Column
          title="Done"
          statusKey="done"
          color="#22c55e"
          tasks={tasks.filter(t => t.status === "done")}
          moveTask={moveTask}
          deleteTask={deleteTask}
          clearColumn={clearColumn}
        />
      </div>
    </div>
  );
}