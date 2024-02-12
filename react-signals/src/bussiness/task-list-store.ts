import { signal, computed, Signal } from '@preact/signals-react';
import { v4 as uuidv4 } from 'uuid';
import { StatsType } from './types';

export class TaskStore {
  tasks = signal<Task[]>([]);

  addTask = (description: string) => {
    this.tasks.value = [...this.tasks.value, new Task(this, description)];
  };

  removeTask = (task: Task) => {
    this.tasks.value =
      this.tasks.value.filter((currentTask) => currentTask !== task);
  };

  stats = computed<StatsType>(() => {
    const total = this.tasks.value.length;
    const completed = this.tasks.value.filter(task => task.isDone.value).length;
    const remaining = total - completed;
    return { total, completed, remaining };
  });
}

export class Task {
  uuid: string;
  description: Signal<string>;
  isDone: Signal<boolean> = signal(false);
  taskStore: TaskStore;

  constructor(taskStore: TaskStore, description: string) {
    this.uuid = uuidv4();
    this.taskStore = taskStore;
    this.description = signal(description);
  }

  setDescription = (description: string) => {
    this.description.value = description;
  };

  toggleIsDone = () => {
    this.isDone.value = !this.isDone.value;
  };

  remove = () => {
    this.taskStore.removeTask(this);
  };
}

export const taskStore = new TaskStore();
