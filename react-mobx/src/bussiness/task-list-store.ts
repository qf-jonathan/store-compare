import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { StatsType } from './types';

export class TaskStore {
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask = (description: string) => {
    this.tasks.push(new Task(this, description));
  };

  removeTask = (task: Task) => {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  };

  get stats(): StatsType {
    const total = this.tasks.length;
    const completed = this.tasks.filter(task => task.isDone).length;
    const remaining = total - completed;
    return { total, completed, remaining };
  }
}

export class Task {
  uuid: string;
  description: string;
  isDone: boolean = false;
  taskStore: TaskStore;

  constructor(taskStore: TaskStore, description: string) {
    this.uuid = uuidv4();
    this.taskStore = taskStore;
    this.description = description;

    makeAutoObservable(this, {
      uuid: false,
      taskStore: false,
    });
  }

  setDescription = (description: string) => {
    this.description = description;
  };

  toggleIsDone = () => {
    this.isDone = !this.isDone;
  };

  remove = () => {
    this.taskStore.removeTask(this);
  };
}

export const taskStore = new TaskStore();
