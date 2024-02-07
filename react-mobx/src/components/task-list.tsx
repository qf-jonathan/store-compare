import { useState, type FormEvent } from "react";
import { Task } from "./task";
import { Stats } from "./stats";
import { observer } from "mobx-react-lite";
import { taskListStore } from "../bussiness/task-list-store";

const _TaskList = () => {
  const { taskList, addTask, stats } = taskListStore;
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
        {taskList.map((item) => (
          <Task key={item.uuid} task={item} />
        ))}
      </ul>
    </section>
  );
};

export const TaskList = observer(_TaskList);
