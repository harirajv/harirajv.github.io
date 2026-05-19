import { render } from '@testing-library/react';
import Home from './Home';

vi.mock('typed.js', () => ({
  default: class { constructor() {} destroy() {} }
}));

describe('Home', () => {
  it('renders the hero section', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('#hero')).toBeInTheDocument();
  });
});
