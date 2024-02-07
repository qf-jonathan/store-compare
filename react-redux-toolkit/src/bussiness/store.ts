import { configureStore } from '@reduxjs/toolkit';
import tasksListReducer from './task-list-reducer';

const store = configureStore({
  reducer: {
    taskList: tasksListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;