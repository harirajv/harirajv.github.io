import { render, screen } from '@testing-library/react';
import Resume from './Resume';

describe('Resume', () => {
  it('renders a lightweight platform resume page', () => {
    const { container } = render(<Resume />);
    expect(container.querySelector('#resume')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /platform engineering proof/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/12m\+ daily change events/i)).toBeInTheDocument();
    expect(screen.getByText(/400\+ enterprise client migrations/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute('href', '/assets/resume.pdf');
    expect(screen.queryByRole('heading', { name: /education/i })).not.toBeInTheDocument();
  });
});
