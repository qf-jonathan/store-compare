import { TaskManagerProvider } from './bussiness/task-manager-provider';
import { TaskList } from './components/task-list';

function App() {
  return (
    <main>
      <h1>Task List</h1>
      <TaskManagerProvider>
        <TaskList />
      </TaskManagerProvider>
    </main>
  );
}

export default App;
