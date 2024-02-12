import { useState, type FormEvent } from "react";
import { Task } from "./task";
import { Stats } from "./stats";
import { observer } from "mobx-react-lite";
import { TaskStore } from "../bussiness/task-list-store";

type TaskListProps = {
  taskStore: TaskStore
};

const _TaskList = ({taskStore}: TaskListProps) => {
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
      <Stats stats={stats} />
      <ul>
        {tasks.map((item) => (
          <Task key={item.uuid} task={item} />
        ))}
      </ul>
    </section>
  );
};

export const TaskList = observer(_TaskList);
