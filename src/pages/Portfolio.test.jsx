import { render, screen, waitFor } from '@testing-library/react';
import Portfolio from './Portfolio';

const portfolioData = {
  platformProjects: [
    {
      name: 'Real-Time CDC Platform',
      category: 'Enterprise Systems',
      problem: 'Legacy synchronization created stale operational data and reconciliation work.',
      platform_move: 'Built an event-driven CDC platform for enterprise order and ERP workflows.',
      outcome: 'Processed 12M+ daily change events while reducing manual reconciliation overhead.',
      tech_tags: 'Kafka,CDC,Debezium,PostgreSQL,CloudWatch'
    }
  ],
  earlierProjects: [
    {
      name: 'Indian Language Identifier',
      category: 'Earlier Data/ML Projects',
      image_src: 'language.png',
      details_txt: 'Identified Indian languages from speech features extracted from news clips.',
      details_link: 'https://github.com/harirajv/Automatic-Language-Identification',
      tech_tags: 'NLP,Scikit-Learn'
    }
  ]
};

describe('Portfolio', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders enterprise systems and earlier project sections from JSON', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(portfolioData)
    });

    render(<Portfolio />);

    expect(screen.getByText(/loading portfolio/i)).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /^enterprise systems$/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /^earlier data\/ml projects$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /selected engineering projects/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /real-time cdc platform/i })).toBeInTheDocument();
    expect(screen.getByText(/12m\+ daily change events/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /indian language identifier/i })).toBeInTheDocument();
    expect(screen.getByText('Kafka')).toBeInTheDocument();
    expect(screen.getByText('Scikit-Learn')).toBeInTheDocument();
  });

  it('renders a fallback when project loading fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('network error'));

    render(<Portfolio />);

    await waitFor(() => {
      expect(screen.getByText(/portfolio is temporarily unavailable/i)).toBeInTheDocument();
    });
  });
});
