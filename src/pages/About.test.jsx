import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('renders the about section', () => {
    const { container } = render(<About />);
    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(screen.getByText(/cloud infrastructure/i)).toBeInTheDocument();
    expect(screen.queryByText(/lorem ipsum/i)).not.toBeInTheDocument();
  });
});
