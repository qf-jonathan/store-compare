import { render, screen } from '@testing-library/react';
import { TaskList } from './task-list';
import userEvent from '@testing-library/user-event';
import { taskListStore } from '../bussiness/task-list-store';
import { runInAction } from 'mobx';

describe('<TaskList />', () => {
  beforeEach(() => {
    runInAction(() => {
      taskListStore.taskList = [
        {
          uuid: 'cd602628-cc99-4639-9418-5c674bca16c6',
          description: 'test description one',
          isDone: true,
        },
        {
          uuid: '46890c50-292d-481f-b460-28cb6abb61e2',
          description: 'test description two',
          isDone: false,
        },
      ];
    });
  });

  it('render component', () => {
    render(<TaskList />);
    expect(screen.getByPlaceholderText('Task description')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeVisible();
  });

  it('should add task', async () => {
    render(<TaskList />);

    await userEvent.type(
      screen.getByPlaceholderText('Task description'),
      'test task description{enter}other example',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add Task' }));

    expect(await screen.findByText('test task description')).toBeVisible();
    expect(await screen.findByText('other example')).toBeVisible();
  });
});
