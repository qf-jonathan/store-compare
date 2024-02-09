import { signal, computed } from '@preact/signals-react';
import { v4 as uuidv4 } from 'uuid';
import { StatsType, TaskType } from './types';


export const taskListSignal = signal<TaskType[]>([]);

export const addTask = (description: string) => {
  taskListSignal.value = [
    ...taskListSignal.value,
    { uuid: uuidv4(), description, isDone: false },
  ];
};

export const removeTask = (uuid: string) => {
  taskListSignal.value = taskListSignal.value.filter(
    task => task.uuid !== uuid
  );
};

export const toggleTaskDone = (uuid: string) => {
  taskListSignal.value = taskListSignal.value.map(task => 
    task.uuid === uuid ? { ...task, isDone: !task.isDone } : task
  );
};

export const updateTask = (uuid: string, description: string) => {
  taskListSignal.value = taskListSignal.value.map(task =>
    task.uuid === uuid ? { ...task, description } : task
  );
};

export const stats = computed<StatsType>(() => {
  const total = taskListSignal.value.length;
  const completed = taskListSignal.value.filter(task => task.isDone).length;
  const remaining = total - completed;
  return { total, completed, remaining };
});
