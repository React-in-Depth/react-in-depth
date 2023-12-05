import { useState, useCallback } from "react";

export function LongTaskManager() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = (task) => {
    if (task.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { task, completed: false },
      ]);
    }
  };

  const toggleTaskCompletion = useCallback((index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
          placeholder="Add new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
              disabled={task.completed}
            />
            {task.task}
          </li>
        ))}
      </ul>
    </div>
  );
}
