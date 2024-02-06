import {
  createContext, useContext, type Dispatch, type SetStateAction
} from "react";
import { StatsType, TaskType } from "./types";

interface TaskManagerContextType {
  taskList: TaskType[];
  setTaskList: Dispatch<SetStateAction<TaskType[]>>;
  addTask: (description: string) => void;
  removeTask: (uuid: string) => void;
  toggleTaskDone: (uuid: string) => void;
  updateTask: (uuid: string, description: string) => void;
  stats: StatsType;
}

export const TaskManagerContext =
  createContext<TaskManagerContextType | null>(null);

export const useTaskManager = () => {
  const context = useContext(TaskManagerContext);
  if (context === null) {
    throw new Error(
      'useTaskManagerContext must be within a TaskManagerProvider'
    );
  }
  return context;
};
