import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('renders a balanced engineering about page', () => {
    const { container } = render(<About />);
    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(screen.getByText(/^Workstyle$/)).toHaveClass('section-kicker');
    expect(screen.queryByText(/^About$/)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /how i build reliable systems/i })).toBeInTheDocument();
    expect(screen.getByText(/i turn operational friction into secure, reusable systems/i)).toBeInTheDocument();
    expect(screen.getByText(/my work starts where teams lose time/i)).toBeInTheDocument();
    expect(screen.queryByText(/hidden parts of engineering organizations/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/without relearning the same failure modes/i)).not.toBeInTheDocument();
    const flowchart = screen.getByRole('img', { name: /devops toolchain loop/i });
    expect(flowchart).toHaveAttribute('src', '/assets/img/devops-toolchain.svg');
    expect(screen.getByText(/kharnagy/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cc by-sa 4.0/i })).toHaveAttribute(
      'href',
      'https://creativecommons.org/licenses/by-sa/4.0/'
    );
    expect(container.querySelector('.principle-grid')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.workstyle-pillar')).toHaveLength(3);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /secure defaults/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /reusable tools/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /recovery-first design/i })).toBeInTheDocument();
    expect(screen.getByText(/make the secure path the easiest path/i)).toBeInTheDocument();
    expect(screen.getByText(/design for rollback, recovery, and idempotency/i)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /platform engineering is how/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/student/i)).not.toBeInTheDocument();
  });
});
