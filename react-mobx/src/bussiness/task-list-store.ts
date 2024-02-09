import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { StatsType, TaskType } from './types';

class TaskListStore {
  taskList: TaskType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask = (description: string) => {
    this.taskList.push({ uuid: uuidv4(), description, isDone: false });
  };

  removeTask = (uuid: string) => {
    this.taskList = this.taskList.filter(task => task.uuid !== uuid);
  };

  toggleTaskDone = (uuid: string) => {
    this.taskList = this.taskList.map(task => 
      task.uuid === uuid ? { ...task, isDone: !task.isDone } : task
    );
  };

  updateTask = (uuid: string, description: string) => {
    this.taskList = this.taskList.map(task =>
      task.uuid === uuid ? { ...task, description } : task
    );
  };

  get stats(): StatsType {
    const total = this.taskList.length;
    const completed = this.taskList.filter(task => task.isDone).length;
    const remaining = total - completed;
    return { total, completed, remaining };
  }
}

export const taskListStore = new TaskListStore();
