import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const projects = [
  {
    name: 'CSP Cost Optimization',
    category: 'Web',
    image_src: 'Cloud-Cost.jpg',
    details_txt: 'Optimizes cloud provider expenses.',
    details_link: 'https://github.com/harirajv/CSP-profit-maximisation',
    tech_tags: 'Python,Cloud'
  },
  {
    name: 'Pedestrian Detection',
    category: 'AI',
    image_src: 'pedestrian.webp',
    details_txt: 'Detects pedestrians.',
    details_link: '',
    tech_tags: 'Computer Vision,PyTorch'
  },
  {
    name: 'HackerNews Mobile Reader',
    category: 'Web',
    image_src: 'news.png',
    details_txt: 'Mobile news reader.',
    details_link: 'https://github.com/harirajv/hackernews',
    tech_tags: 'React'
  },
  {
    name: 'Fourth Project',
    category: 'AI',
    image_src: 'language.png',
    details_txt: 'Not featured.',
    details_link: '',
    tech_tags: 'NLP'
  }
];

describe('Home', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the technical showcase hero', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ projects })
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /software engineer for systems that ship/i })).toBeInTheDocument();
    expect(screen.getByText(/aws infrastructure/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view projects/i })).toHaveAttribute('href', '/portfolio');
    expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute('href', '/assets/resume.pdf');
    expect(await screen.findByRole('heading', { name: /csp cost optimization/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /fourth project/i })).not.toBeInTheDocument();
  });
});
