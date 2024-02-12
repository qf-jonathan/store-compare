import { TaskList } from './components/task-list';
import { taskStore } from './bussiness/task-list-store';

function App() {
  return (
    <main>
      <h1>Task List - Mobx</h1>
      <TaskList taskStore={taskStore} />
    </main>
  );
}

export default App;
