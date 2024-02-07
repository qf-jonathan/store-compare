import { useState, type FormEvent } from "react";
import { Task } from "./task";
import { Stats } from "./stats";
import { useDispatch, useSelector } from "react-redux";
import { TaskType } from "../bussiness/types";
import { RootState } from "../bussiness/store";
import { addTask } from "../bussiness/task-list-reducer";

export const TaskList = () => {
  const taskList = useSelector((state: RootState) => state.taskList.taskList);
  const dispatch = useDispatch();

  const [ taskDescription, setTaskDescription ] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskDescription === '') {
      return;
    }
    dispatch(addTask(taskDescription));
    setTaskDescription('');
  };

  const total = taskList.length;
  const completed = taskList.filter((task: TaskType) => task.isDone).length;
  const remaining = total - completed;

  const stats = { total, completed, remaining };

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
        {taskList.map((item: TaskType) => (
          <Task key={item.uuid} task={item} />
        ))}
      </ul>
    </section>
  );
};
