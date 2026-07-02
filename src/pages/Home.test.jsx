import { readFileSync } from 'node:fs';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const portfolioData = {
  platformProjects: [
    {
      name: 'Real-Time CDC System',
      category: 'Enterprise Systems',
      problem: 'Legacy synchronization created stale data.',
      platform_move: 'Built an event-driven CDC system.',
      outcome: 'Processed 12M+ daily change events.',
      tech_tags: 'Kafka,CDC,Debezium,PostgreSQL,CloudWatch'
    },
    {
      name: 'Zero-Trust Infrastructure Automation',
      category: 'Enterprise Systems',
      problem: 'Cloud delivery depended on over-broad access patterns.',
      platform_move: 'Standardized Terraform, OIDC, and private networking.',
      outcome: 'Removed static deployment credentials.',
      tech_tags: 'Terraform,AWS,OIDC,PrivateLink,ECS'
    },
    {
      name: 'AI Enablement Systems',
      category: 'Enterprise Systems',
      problem: 'Internal AI prototypes were difficult to productionize safely.',
      platform_move: 'Moved AI workflows into governed delivery paths.',
      outcome: 'Lowered MTTR by 25%.',
      tech_tags: 'Databricks,Bedrock,MCP,AIOps'
    },
    {
      name: 'CI/CD & Developer Tooling',
      category: 'Enterprise Systems',
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

  it('renders the enterprise systems brand homepage without repeating platform copy', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(portfolioData)
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /i build the systems that make enterprise engineering move faster/i })).toBeInTheDocument();
    expect(screen.getByText(/\$ platform engineering for enterprise modernization/i)).toBeInTheDocument();
    expect(screen.getByText(/real-time data, zero-trust cloud infrastructure, and ai enablement/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^view projects$/i })).toHaveAttribute('href', '/portfolio');
    expect(screen.getByRole('link', { name: /email me/i })).toHaveAttribute('href', 'mailto:harirajv@gmail.com');
    expect(screen.getByRole('link', { name: /email me/i }).querySelector('img.button-favicon')).toHaveAttribute('src', '/assets/logos/gmail-favicon.ico');
    expect(screen.getByRole('link', { name: /email me/i }).querySelector('img.button-favicon')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('link', { name: /linkedin/i }).querySelector('img.button-favicon')).toHaveAttribute('src', '/assets/logos/linkedin-favicon.ico');
    expect(screen.getByRole('link', { name: /github/i }).querySelector('img.button-favicon')).toHaveAttribute('src', '/assets/logos/github-favicon.svg');
    expect(screen.getAllByText(/12m\+/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/4-6 min/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('region', { name: /control plane/i })).toBeInTheDocument();
    expect(screen.getByText(/cdc stream/i)).toBeInTheDocument();
    expect(screen.getByText(/secure deploy/i)).toBeInTheDocument();
    expect(screen.getByText(/ai recovery/i)).toBeInTheDocument();
    expect(document.querySelector('.system-line')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /real-time data systems/i })).toBeInTheDocument();
    const featuredHeading = screen.getByRole('heading', { name: /proof in production/i });
    const featuredSection = featuredHeading.closest('section');

    expect(screen.queryByRole('heading', { name: /case studies with measurable outcomes/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /engineering work with results you can trace/i })).not.toBeInTheDocument();
    expect(await within(featuredSection).findByRole('heading', { name: /real-time cdc system/i })).toBeInTheDocument();
    expect(within(featuredSection).queryByText(/^Enterprise Systems$/)).not.toBeInTheDocument();
    expect(within(featuredSection).getAllByText(/^Problem$/)).toHaveLength(3);
    expect(within(featuredSection).getAllByText(/^Problem$/)[0].closest('.home-case-row')).toBeInTheDocument();
    expect(within(featuredSection).getAllByText(/^Action$/)).toHaveLength(3);
    expect(within(featuredSection).getAllByText(/^Action$/)[0].closest('.home-case-row')).toBeInTheDocument();
    expect(within(featuredSection).queryByText(/^Technical move$/)).not.toBeInTheDocument();
    expect(within(featuredSection).getAllByText(/^Outcome$/)).toHaveLength(3);
    expect(within(featuredSection).getAllByText(/^Outcome$/)[0].closest('.home-case-row')).toBeInTheDocument();
    expect(within(featuredSection).queryByText(/Problem:/)).not.toBeInTheDocument();
    expect(screen.getAllByText(/^Kafka$/)[0].closest('.tech-product-tag').querySelector('img.tech-logo-icon')).toHaveAttribute('src', '/assets/logos/apache-kafka.svg');
    expect(screen.getAllByText(/^Kafka$/)[0].closest('.tech-product-tag')).toHaveClass('tech-logo-kafka');
    expect(screen.getAllByText(/^Debezium$/)[0].closest('.tech-product-tag').querySelector('img.tech-logo-icon')).toHaveAttribute('src', '/assets/logos/debezium-favicon.ico');
    expect(screen.getAllByText(/^Debezium$/)[0].closest('.tech-product-tag')).toHaveClass('tech-logo-debezium');
    expect(screen.getByText(/^PostgreSQL$/).closest('.tech-product-tag').querySelector('img.tech-logo-icon')).toHaveAttribute('src', '/assets/logos/postgresql-favicon.ico');
    expect(screen.getByText(/^PostgreSQL$/).closest('.tech-product-tag')).toHaveClass('tech-logo-postgres');
    expect(screen.getByText(/^AWS OIDC$/).closest('.tech-product-tag').querySelector('img.tech-logo-icon')).toHaveAttribute('src', '/assets/logos/aws-iam.svg');
    expect(screen.getByText(/^AWS OIDC$/).closest('.tech-product-tag')).toHaveClass('tech-logo-aws');
    expect(screen.getByText(/^ECS\/Fargate$/).closest('.tech-product-tag').querySelector('img.tech-logo-icon')).toHaveAttribute('src', '/assets/logos/aws-fargate.svg');
    expect(screen.getByText(/^ECS$/).closest('.tech-product-tag').querySelector('img.tech-logo-icon')).toHaveAttribute('src', '/assets/logos/aws-ecs.svg');
    expect(screen.getByText(/^CloudWatch$/).closest('.tech-product-tag').querySelector('img.tech-logo-icon')).toHaveAttribute('src', '/assets/logos/aws-cloudwatch.svg');
    expect(screen.getAllByText(/^Amazon Bedrock$/)[0].closest('.tech-product-tag').querySelector('img.tech-logo-icon')).toHaveAttribute('src', '/assets/logos/amazon-bedrock.svg');
    expect(screen.getAllByText(/^Databricks$/)[0].closest('.tech-product-tag')).toHaveClass('tech-logo-databricks');
    expect(screen.queryByText(/^Bedrock RAG$/)).not.toBeInTheDocument();
    expect(screen.getAllByText(/^CDC$/)[0].closest('.tech-concept-tag').querySelector('img')).not.toBeInTheDocument();
    expect(screen.getByText(/^Idempotency$/).closest('.tech-concept-tag').querySelector('img')).not.toBeInTheDocument();
    expect(document.querySelector('.tech-logo-mark')).not.toBeInTheDocument();
    expect(screen.getByText(/^PostgreSQL$/).closest('.tech-product-tag').querySelector('.bx')).not.toBeInTheDocument();
    expect(document.querySelector('.tech-icon-tag')).not.toBeInTheDocument();
    expect(screen.queryByText(/platform move/i)).not.toBeInTheDocument();
    expect((document.body.textContent.match(/\bplatforms?\b/gi) || [])).toHaveLength(1);
  });

  it('uses brand-tinted visible fills for homepage tech badges', () => {
    const appCss = readFileSync('src/App.css', 'utf8');

    expect(appCss).toContain('.tech-logo-kafka');
    expect(appCss).toContain('background: #f1f5f9;');
    expect(appCss).toContain('.tech-logo-debezium');
    expect(appCss).toContain('background: #dcfff6;');
    expect(appCss).toContain('.tech-logo-postgres');
    expect(appCss).toContain('background: #e3f0ff;');
    expect(appCss).toContain('.tech-logo-terraform');
    expect(appCss).toContain('background: #eee9ff;');
    expect(appCss).toContain('.tech-logo-aws');
    expect(appCss).toContain('background: #fff3d8;');
    expect(appCss).toContain('.tech-logo-databricks');
    expect(appCss).toContain('background: #ffe8e3;');
    expect(appCss).toContain('.tag-list .tech-concept-tag');
    expect(appCss).toContain('background: #eff6ff;');
    expect(appCss).toMatch(/\.timeline-company\s*{\s*display: flex;/);
    expect(appCss).not.toMatch(/\.timeline-company\s*{\s*display: inline-flex;/);
  });

  it('renders career arc years in chronological order', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(portfolioData)
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const careerProgression = screen.getByRole('list', { name: /career progression/i });
    const timelineItems = within(careerProgression).getAllByRole('listitem');
    const years = timelineItems.map((item) => within(item).getByText(/\d{4}/).textContent);

    expect(years).toEqual(['2015-2017', '2017-2023', '2023-Present']);
    expect(document.querySelector('img[src="/assets/logos/norton-favicon.ico"]')).toHaveAttribute('aria-hidden', 'true');
    expect(document.querySelector('img[src="/assets/logos/freshworks-favicon.ico"]')).toHaveAttribute('aria-hidden', 'true');
    expect(document.querySelector('img[src="/assets/logos/master-electronics.svg"]')).toHaveAttribute('aria-hidden', 'true');
  });
});
