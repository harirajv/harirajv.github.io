import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('renders a balanced engineering about page', () => {
    const { container } = render(<About />);
    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /how i build reliable systems/i })).toBeInTheDocument();
    expect(screen.getByText(/i like work that turns messy operations into clear systems/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /make the secure path the easiest path/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /design for rollback, recovery, and idempotency/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /platform engineering is how/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/student/i)).not.toBeInTheDocument();
  });
});
