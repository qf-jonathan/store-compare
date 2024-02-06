import { useState, type ReactNode } from "react";
import { v4 } from 'uuid';
import { TaskType } from "./types";
import { TaskManagerContext } from "./task-manager-context";

interface TaskManagerProviderProps {
  children: ReactNode;
}

export const TaskManagerProvider = ({children}: TaskManagerProviderProps) => {
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  const addTask = (description: string) => {
    setTaskList([...taskList, {uuid: v4(), description, isDone: false}]);
  };

  const removeTask = (uuid: string) => {
    setTaskList(taskList.filter((task) => task.uuid !== uuid));
  };

  const toggleTaskDone = (uuid: string) => {
    setTaskList(
      taskList.map(
        (task) => task.uuid === uuid ? {...task, isDone: !task.isDone}: task
      )
    );
  };

  const updateTask = (uuid: string, description: string) => {
    setTaskList(
      taskList.map(
        (task) => task.uuid === uuid ? {...task, description}: task
      )
    );
  };

  const total = taskList.length;
  const completed = taskList.filter((task) => task.isDone).length;
  const remaining = total - completed;

  const provided = {
    taskList,
    setTaskList,
    addTask,
    removeTask,
    toggleTaskDone,
    updateTask,
    stats: {
      total,
      completed,
      remaining,
    }
  };
  
  return (
    <TaskManagerContext.Provider value={provided}>
      {children}
    </TaskManagerContext.Provider>
  );
};
