import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { FieldEdit } from './field-edit';

describe('<FieldEdit />', () => {
  it('render component', () => {
    render(
      <FieldEdit value='test content' onSave={() => {}} onCancel={() => {}} />
    );

    expect(screen.getByRole('textbox')).toHaveValue('test content');
    expect(screen.getByRole('button', {name: 'save'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'cancel'})).toBeInTheDocument();
  });

  it('component keyboard interactions', async () => {
    const user = userEvent.setup();
    const onSaveMock = vi.fn();
    const onCancelMock = vi.fn();
    render(
      <FieldEdit
        value=''
        onSave={onSaveMock}
        onCancel={onCancelMock}
      />
    );

    await user.keyboard('hello world{Enter}{Escape}');

    expect(onSaveMock).toHaveBeenCalledWith('hello world');
    expect(onCancelMock).toHaveBeenCalled();
  });

  it('component button interactions', async () => {
    const onSaveMock = vi.fn();
    const onCancelMock = vi.fn();
    render(
      <FieldEdit
        value='example value'
        onSave={onSaveMock}
        onCancel={onCancelMock}
      />
    );

    fireEvent.click(screen.getByRole('button', {name: 'save'}));
    fireEvent.click(screen.getByRole('button', {name: 'cancel'}));

    expect(onSaveMock).toHaveBeenCalledWith('example value');
    expect(onCancelMock).toHaveBeenCalled();
  });
});
