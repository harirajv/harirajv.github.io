import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('renders the platform engineering manifesto', () => {
    const { container } = render(<About />);
    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(screen.getByText(/repeated operational pain becomes reusable capability/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /make the secure path the easiest path/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /design for rollback, recovery, and idempotency/i })).toBeInTheDocument();
    expect(screen.queryByText(/student/i)).not.toBeInTheDocument();
  });
});
