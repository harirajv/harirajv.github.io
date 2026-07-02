import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

describe('Layout', () => {
  it('renders banner header', () => {
    render(
      <MemoryRouter>
        <Layout><div>stub</div></Layout>
      </MemoryRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the 4 nav links with expected hrefs', () => {
    render(
      <MemoryRouter>
        <Layout><div>stub</div></Layout>
      </MemoryRouter>
    );
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const resumeLink = screen.getByRole('link', { name: /Resume/i });
    const portfolioLink = screen.getByRole('link', { name: /Portfolio/i });
    const contactLink = screen.getByRole('link', { name: /Contact/i });

    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /hariraj venkatesan/i })).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(resumeLink).toHaveAttribute('href', '/resume');
    expect(portfolioLink).toHaveAttribute('href', '/portfolio');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('marks the home nav icon for warm accent styling', () => {
    render(
      <MemoryRouter>
        <Layout><div>stub</div></Layout>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /^home$/i }).querySelector('svg')).toHaveClass('home-nav-icon');
  });

  it('passes children through', () => {
    render(
      <MemoryRouter>
        <Layout><div data-testid="stub-child">stub</div></Layout>
      </MemoryRouter>
    );
    expect(screen.getByTestId('stub-child')).toBeInTheDocument();
  });
});
