import { TaskList } from './components/task-list';
import { Provider } from 'react-redux';
import store from './bussiness/store';

function App() {
  return (
    <main>
      <h1>Task List - Redux Toolkit</h1>
      <Provider store={store}>
        <TaskList />
      </Provider>
    </main>
  );
}

export default App;
