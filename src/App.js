import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (taskInput.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput("");
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.text.localeCompare(b.text);
    } else {
      return b.text.localeCompare(a.text);
    }
  });

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleTaskCompletion(task.id)}>
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
