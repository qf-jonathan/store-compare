import { render, screen } from '@testing-library/react';
import { Stats } from './stats';

describe('<Stats />', () => {
  it('render component', () => {
    render(<Stats stats={{total: 13, completed: 6, remaining: 7}} />);

    expect(screen.getByRole('status')).toHaveTextContent(
      'Total: 13 | Completed: 6 | Remaining: 7'
    );
  });
});
