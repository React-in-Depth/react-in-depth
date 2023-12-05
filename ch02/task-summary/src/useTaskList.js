import { useCallback, useState } from "react";

export function useTaskList() {
  const [tasks, setTasks] = useState([]);
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

  return { tasks, addTask, toggleTaskCompletion };
}
