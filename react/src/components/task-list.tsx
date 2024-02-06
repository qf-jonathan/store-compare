import { useState, type FormEvent } from "react";
import { useTaskManager } from "../bussiness/task-manager-context";
import { Task } from "./task";
import { Stats } from "./stats";

export const TaskList = () => {
  const { taskList, addTask, stats } = useTaskManager();
  const [ taskDescription, setTaskDescription ] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskDescription === '') {
      return;
    }
    addTask(taskDescription);
    setTaskDescription('');
  };

  return (
    <section className="task-list">
      <form onSubmit={onSubmit}>
        <input
          value={taskDescription}
          onChange={(event) => setTaskDescription(event.target.value)}
        />
        <button type="submit" className="success">Add Task</button>
      </form>
      <Stats stats={stats} />
      <ul>
        {taskList.map((item) => (
          <Task key={item.uuid} task={item} />
        ))}
      </ul>
    </section>
  );
};
