import { render, screen } from '@testing-library/react';
import Contact from './Contact';

describe('Contact', () => {
  it('renders the contact form with all required fields and a submit button', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('#contact')).toBeInTheDocument();
    expect(container.querySelector('input[name="user_name"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="user_email"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="subject"]')).toBeInTheDocument();
    expect(container.querySelector('textarea[name="message"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });
});
