import { useNewTaskInput } from "./useNewTask";
import { useTaskList } from "./useTaskList";

export function CompactTaskManager() {
  const { tasks, addTask, toggleTaskCompletion } = useTaskList();
  const { newTask, handleNewTaskChange, handleSubmit } =
    useNewTaskInput(addTask);

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
