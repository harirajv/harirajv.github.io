import { render, screen } from '@testing-library/react';
import Contact from './Contact';

describe('Contact', () => {
  it('renders direct contact channels without the old contact form', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('#contact')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /let's connect/i })).toBeInTheDocument();
    expect(screen.getByText(/reach out about engineering roles, technical collaboration, or systems work/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', 'mailto:harirajv@gmail.com');
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://linkedin.com/in/hariraj-venkatesan');
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/harirajv');
    expect(screen.queryByText(/platform engineering/i)).not.toBeInTheDocument();
    expect(container.querySelector('form')).not.toBeInTheDocument();
    expect(screen.queryByText(/hvenka17@asu.edu/i)).not.toBeInTheDocument();
  });
});
