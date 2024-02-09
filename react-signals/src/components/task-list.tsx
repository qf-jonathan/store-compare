import { useState, type FormEvent } from "react";
import { Task } from "./task";
import { Stats } from "./stats";
import { taskListSignal, addTask, stats } from "../bussiness/task-list-store";

export const TaskList = () => {
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
          placeholder="Task description"
          onChange={(event) => setTaskDescription(event.target.value)}
        />
        <button type="submit" className="success">Add Task</button>
      </form>
      <Stats stats={stats.value} />
      <ul>
        {taskListSignal.value.map((item) => (
          <Task key={item.uuid} task={item} />
        ))}
      </ul>
    </section>
  );
};
