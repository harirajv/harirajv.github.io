import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const portfolioData = {
  platformProjects: [
    {
      name: 'Real-Time CDC Platform',
      category: 'Platform Work',
      problem: 'Legacy synchronization created stale data.',
      platform_move: 'Built an event-driven CDC platform.',
      outcome: 'Processed 12M+ daily change events.',
      tech_tags: 'Kafka,CDC,Debezium'
    },
    {
      name: 'Zero-Trust Infrastructure Automation',
      category: 'Platform Work',
      problem: 'Cloud delivery depended on over-broad access patterns.',
      platform_move: 'Standardized Terraform, OIDC, and private networking.',
      outcome: 'Removed static deployment credentials.',
      tech_tags: 'Terraform,AWS,OIDC,PrivateLink'
    },
    {
      name: 'AI Enablement Platform',
      category: 'Platform Work',
      problem: 'Internal AI prototypes were difficult to productionize safely.',
      platform_move: 'Moved AI workflows into governed platform paths.',
      outcome: 'Lowered MTTR by 25%.',
      tech_tags: 'Databricks,Bedrock,MCP,AIOps'
    },
    {
      name: 'CI/CD Platform & Developer Tooling',
      category: 'Platform Work',
      problem: 'Delivery feedback loops were slow.',
      platform_move: 'Modernized CI/CD tooling.',
      outcome: 'Improved deployment velocity.',
      tech_tags: 'GitHub Actions,Docker,ECS'
    }
  ],
  earlierProjects: []
};

describe('Home', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the platform engineering brand homepage', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(portfolioData)
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /i build the platforms that make enterprise engineering move faster/i })).toBeInTheDocument();
    expect(screen.getByText(/real-time data platforms, zero-trust cloud infrastructure, and ai enablement/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view platform work/i })).toHaveAttribute('href', '/portfolio');
    expect(screen.getByRole('link', { name: /email me/i })).toHaveAttribute('href', 'mailto:harirajv@gmail.com');
    expect(screen.getByText(/12m\+/i)).toBeInTheDocument();
    expect(screen.getByText(/4-6 min/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /real-time data platforms/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /real-time cdc platform/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /ci\/cd platform & developer tooling/i })).not.toBeInTheDocument();
  });
});
