import { render, screen } from '@testing-library/react';
import Resume from './Resume';

describe('Resume', () => {
  it('renders the resume section', () => {
    const { container } = render(<Resume />);
    expect(container.querySelector('#resume')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
    expect(screen.queryByText(/sumary/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute('href', '/assets/resume.pdf');
  });
});
