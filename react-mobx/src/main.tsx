import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { injectStores } from '@mobx-devtools/tools';
import { taskListStore } from './bussiness/task-list-store';
import './index.css';

if (process.env.NODE_ENV === 'development') {
  injectStores({taskListStore});
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
