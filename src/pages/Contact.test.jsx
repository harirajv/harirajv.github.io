import { render, screen, within } from '@testing-library/react';
import Contact from './Contact';

describe('Contact', () => {
  it('highlights LinkedIn as the preferred direct channel without extra panels or forms', () => {
    const { container } = render(<Contact />);

    expect(container.querySelector('#contact')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /let's connect/i })).toBeInTheDocument();
    expect(screen.getByText(/reach out about engineering roles, technical collaboration, or systems work/i)).toBeInTheDocument();

    const contactCards = screen.getAllByRole('link').filter((link) => link.classList.contains('direct-contact-card'));
    expect(contactCards).toHaveLength(3);
    expect(contactCards[0]).toHaveAttribute('href', 'https://linkedin.com/in/hariraj-venkatesan');
    expect(within(contactCards[0]).getByText(/^LinkedIn$/)).toBeInTheDocument();
    expect(within(contactCards[0]).getByText(/^Fastest response$/)).toHaveClass('preferred-badge');
    expect(screen.getByText(/^Contact$/).closest('.contact').querySelector('.direct-contact-grid')).toHaveClass('contact-card-grid-spaced');

    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', 'mailto:harirajv@gmail.com');
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/harirajv');
    expect(screen.queryByText(/best way to reach me/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/useful for async details/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/quick path to code/i)).not.toBeInTheDocument();
    contactCards.forEach((card) => {
      expect(card.querySelector('p')).not.toBeInTheDocument();
    });
    expect(screen.queryByText(/hvenka17@asu.edu/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\+1/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /preferred channel/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /message me/i })).not.toBeInTheDocument();
    expect(container.querySelector('form')).not.toBeInTheDocument();
  });
});
