import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';

vi.mock('typed.js', () => ({
  default: class { constructor() {} destroy() {} }
}));

describe('App routing', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ projects: [] })
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders Home at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes/>
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /i build the platforms that make enterprise engineering move faster/i })).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders About at /about', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRoutes/>
      </MemoryRouter>
    );
    expect(container.querySelector('#about')).toBeInTheDocument();
  });

  it('renders Resume at /resume', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/resume']}>
        <AppRoutes/>
      </MemoryRouter>
    );
    expect(container.querySelector('#resume')).toBeInTheDocument();
  });

  it('renders Portfolio at /portfolio', async () => {
    render(
      <MemoryRouter initialEntries={['/portfolio']}>
        <AppRoutes/>
      </MemoryRouter>
    );
    expect(await screen.findByRole('heading', { name: /platform work for enterprise modernization/i })).toBeInTheDocument();
  });

  it('renders Contact at /contact', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/contact']}>
        <AppRoutes/>
      </MemoryRouter>
    );
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });

  it('renders Layout chrome but no page section on unknown route', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/bogus']}>
        <AppRoutes/>
      </MemoryRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(container.querySelector('#hero')).toBeNull();
    expect(container.querySelector('#about')).toBeNull();
    expect(container.querySelector('#resume')).toBeNull();
    expect(container.querySelector('#portfolio')).toBeNull();
    expect(container.querySelector('#contact')).toBeNull();
  });
});
