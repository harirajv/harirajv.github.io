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

    // About intentionally points to "/" (Layout.jsx:30 maps "About" -> "/")
    expect(aboutLink).toHaveAttribute('href', '/');
    expect(resumeLink).toHaveAttribute('href', '/resume');
    expect(portfolioLink).toHaveAttribute('href', '/portfolio');
    expect(contactLink).toHaveAttribute('href', '/contact');
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
