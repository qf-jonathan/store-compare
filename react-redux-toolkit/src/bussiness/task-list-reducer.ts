import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskType } from './types';
import { v4 as uuidv4 } from 'uuid';

interface TasksState {
  taskList: TaskType[];
}

const initialState: TasksState = {
  taskList: [],
};

const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<TaskType>) => {
        state.taskList.push(action.payload);
      },
      prepare: (description: string) => ({
        payload: { uuid: uuidv4(), description, isDone: false } as TaskType,
      }),
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter(
        task => task.uuid !== action.payload
      );
    },
    toggleTaskDone: (state, action: PayloadAction<string>) => {
      const task = state.taskList.find(task => task.uuid === action.payload);
      if (task) {
        task.isDone = !task.isDone;
      }
    },
    updateTask:
      (state, action: PayloadAction<{ uuid: string; description: string }>) => {
        const task = state.taskList.find(
          task => task.uuid === action.payload.uuid
        );
        if (task) {
          task.description = action.payload.description;
        }
      },
  },
});

export const {
  addTask, removeTask, toggleTaskDone, updateTask
} = taskListSlice.actions;

export default taskListSlice.reducer;
