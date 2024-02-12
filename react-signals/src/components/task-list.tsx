import { useState, type FormEvent } from "react";
import { Task } from "./task";
import { Stats } from "./stats";
import { TaskStore } from "../bussiness/task-list-store";

type TaskListProps = {
  taskStore: TaskStore;
};

export const TaskList = ({taskStore}: TaskListProps) => {
  const { tasks, addTask, stats } = taskStore;
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
        {tasks.value.map((item) => (
          <Task key={item.uuid} task={item} />
        ))}
      </ul>
    </section>
  );
};
