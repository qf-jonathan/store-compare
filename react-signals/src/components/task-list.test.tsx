import { render, screen } from '@testing-library/react';
import { TaskList } from './task-list';
import { TaskStore } from '../bussiness/task-list-store';
import userEvent from '@testing-library/user-event';

describe('<TaskList />', () => {
  beforeEach(() => {
    const taskStore = new TaskStore();
    taskStore.addTask('test description one');
    taskStore.addTask('test description two');
    taskStore.tasks.value[1].toggleIsDone();
    render(<TaskList taskStore={taskStore} />);
  });

  it('render component', async () => {
    expect(screen.getByPlaceholderText('Task description')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeVisible();
    expect(screen.getByText('test description one')).toBeVisible();
    expect(screen.getByText('test description two')).toBeVisible();
    expect(screen.getAllByRole('button', { name: 'edit' }).length).toEqual(2);
    expect(screen.getAllByRole('button', { name: 'remove' }).length).toEqual(2);
  });

  it('should add task', async () => {
    await userEvent.type(
      screen.getByPlaceholderText('Task description'),
      'test task description{enter}other example',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add Task' }));

    expect(await screen.findByText('test task description')).toBeVisible();
    expect(await screen.findByText('other example')).toBeVisible();
  });

  it('should remove task', async () => {
    await userEvent.click(screen.getAllByRole('button', {name: 'remove'})[0]);
    expect(screen.queryByText('test description one')).not.toBeInTheDocument();
    expect(screen.queryByText('test description two')).toBeVisible();

    await userEvent.click(screen.getAllByRole('button', {name: 'remove'})[0]);
    expect(screen.queryByText('test description two')).not.toBeInTheDocument();
  });

  it('should edit task', async () => {
    userEvent.click(screen.getAllByRole('button', { name: 'edit' })[1]);
    userEvent.type(
      await screen.findByDisplayValue('test description two'),
      '{backspace}{backspace}{backspace}other{enter}',
    );

    expect(
      await screen.findByText('test description other'),
    ).toBeInTheDocument();
  });
});
