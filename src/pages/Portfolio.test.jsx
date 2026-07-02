import { render, screen, waitFor } from '@testing-library/react';
import Portfolio from './Portfolio';

const projects = [
  {
    name: 'CSP Cost Optimization',
    category: 'Web',
    image_src: 'Cloud-Cost.jpg',
    details_txt: 'Optimizes cloud provider expenses.',
    details_link: 'https://github.com/harirajv/CSP-profit-maximisation',
    tech_tags: 'Python,Cloud'
  }
];

describe('Portfolio', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders project cards from JSON', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ projects })
    });

    render(<Portfolio />);

    expect(screen.getByText(/loading projects/i)).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /csp cost optimization/i })).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open csp cost optimization/i })).toHaveAttribute('href', projects[0].details_link);
  });

  it('renders a fallback when project loading fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('network error'));

    render(<Portfolio />);

    await waitFor(() => {
      expect(screen.getByText(/projects are temporarily unavailable/i)).toBeInTheDocument();
    });
  });
});
