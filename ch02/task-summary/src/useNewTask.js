import { useState } from "react";

export function useNewTaskInput(addTask) {
  const [newTask, setNewTask] = useState("");

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask(""); // Reset input after adding task
  };

  return { newTask, handleNewTaskChange, handleSubmit };
}
