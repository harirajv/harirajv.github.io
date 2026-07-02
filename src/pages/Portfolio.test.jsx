import { render, screen, waitFor, within } from '@testing-library/react';
import Portfolio from './Portfolio';
import portfolioProjects from '../../public/assets/projects.json';

const portfolioData = {
  platformProjects: [
    {
      name: 'Real-Time CDC System',
      category: 'Enterprise',
      problem: 'Legacy synchronization created stale operational data and reconciliation work.',
      platform_move: 'Built an event-driven CDC system for enterprise order and ERP workflows.',
      outcome: 'Processed 12M+ daily change events while reducing manual reconciliation overhead.',
      tech_tags: 'Kafka,CDC,Debezium,PostgreSQL,CloudWatch'
    }
  ],
  earlierProjects: [
    {
      name: 'Indian Language Identifier',
      category: 'Data/ML',
      image_src: 'language.png',
      details_txt: 'Identified Indian languages from speech features extracted from news clips.',
      details_link: 'https://github.com/harirajv/Automatic-Language-Identification',
      paper_links: [
        {
          label: 'IEEE',
          url: 'https://ieeexplore.ieee.org/abstract/document/8724070'
        }
      ],
      tech_tags: 'NLP,Scikit-Learn'
    },
    {
      name: 'Anchor-Free Pedestrian Detection',
      category: 'Data/ML',
      image_src: 'pedestrian.webp',
      details_txt: 'Computer vision project using residual networks.',
      details_link: '',
      paper_links: [
        {
          label: 'Springer',
          url: 'https://link.springer.com/chapter/10.1007/978-981-19-2347-0_39'
        }
      ],
      tech_tags: 'Computer Vision,PyTorch'
    },
    {
      name: 'Chronic Kidney Disease Detection',
      category: 'Data/ML',
      image_src: 'kidney-ai-detection.svg',
      details_txt: 'Healthcare ML project exploring early chronic kidney disease detection from clinical indicators.',
      details_link: '',
      tech_tags: 'Healthcare ML,Data Scarcity'
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
    expect(await screen.findByRole('heading', { name: /^modernization systems$/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /^ml lab$/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /^data\/ml lab$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /^earlier data\/ml projects$/i })).not.toBeInTheDocument();
    expect(screen.getByText(/^Portfolio$/)).toHaveClass('section-kicker');
    expect(document.querySelectorAll('.section-kicker')).toHaveLength(1);
    expect(screen.queryByText(/^Enterprise$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Supporting range$/)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^systems with outcomes\.$/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /selected engineering case studies/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /real-time cdc system/i })).toBeInTheDocument();
    expect(screen.getByText(/12m\+ daily change events/i)).toBeInTheDocument();
    expect(screen.queryByText(/^selected build$/i)).not.toBeInTheDocument();
    expect(document.querySelector('.case-study-eyebrow')).not.toBeInTheDocument();
    expect(screen.getByLabelText(/real-time cdc system case study/i)).toHaveClass('designed-case-study-card');
    expect(screen.getByText(/^Outcome$/i).closest('.case-study-row')).toHaveClass('case-study-outcome');
    expect(screen.getByRole('heading', { name: /more systems in progress/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /indian language identifier/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /anchor-free pedestrian detection/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /more ml in progress/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /more systems in progress/i }).closest('article')).toHaveClass('coming-soon-tile');
    expect(screen.getByRole('heading', { name: /more ml in progress/i }).closest('article')).toHaveClass('coming-soon-tile');
    expect(screen.getByRole('heading', { name: /more systems in progress/i }).closest('article').querySelector('svg')).toHaveClass('coming-soon-icon');
    expect(screen.getByRole('heading', { name: /more ml in progress/i }).closest('article').querySelector('svg')).toHaveClass('coming-soon-icon');
    expect(screen.getByRole('heading', { name: /more systems in progress/i }).closest('article')).not.toHaveClass('project-card');
    expect(screen.queryByText(/enterprise systems/i)).not.toBeInTheDocument();
    const ckdCard = screen.getByRole('heading', { name: /chronic kidney disease detection/i }).closest('article');
    expect(within(ckdCard).queryByText(/^Data\/ML$/)).not.toBeInTheDocument();
    expect(ckdCard.querySelector('img')).toHaveAttribute('src', '/assets/img/portfolio/kidney-ai-detection.svg');
    expect((document.body.textContent.match(/\bprojects\b/gi) || [])).toHaveLength(0);
    expect(screen.queryByText(/additional enterprise systems stories/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/new applied ml writeups/i)).not.toBeInTheDocument();
    expect(screen.getByText('Kafka')).toBeInTheDocument();
    expect(screen.getByText('Scikit-Learn')).toBeInTheDocument();

    const languageCard = screen.getByRole('heading', { name: /indian language identifier/i }).closest('article');
    const githubLink = within(languageCard).getByRole('link', { name: /open github for indian language identifier/i });
    const ieeeLink = within(languageCard).getByRole('link', { name: /open ieee for indian language identifier/i });

    expect(within(languageCard).queryByText(/^View project$/i)).not.toBeInTheDocument();
    expect(githubLink).toHaveTextContent(/^GitHub$/);
    expect(githubLink).toHaveClass('project-link-pill');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/harirajv/Automatic-Language-Identification');
    expect(ieeeLink).toHaveTextContent(/^IEEE$/);
    expect(ieeeLink).toHaveClass('project-link-pill');
    expect(ieeeLink).toHaveAttribute('href', 'https://ieeexplore.ieee.org/abstract/document/8724070');
    expect(languageCard.querySelector('.project-meta-row')).toContainElement(githubLink);
    expect(languageCard.querySelector('.project-meta-row')).toContainElement(screen.getByText('Scikit-Learn'));
    expect(languageCard.querySelector('.project-link-row')).not.toHaveClass('project-link-row-stacked');

    const pedestrianCard = screen.getByRole('heading', { name: /anchor-free pedestrian detection/i }).closest('article');
    const springerLink = within(pedestrianCard).getByRole('link', { name: /open springer for anchor-free pedestrian detection/i });

    expect(springerLink).toHaveTextContent(/^Springer$/);
    expect(springerLink).toHaveClass('project-link-pill');
    expect(springerLink).toHaveAttribute('href', 'https://link.springer.com/chapter/10.1007/978-981-19-2347-0_39');
  });

  it('renders a fallback when project loading fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('network error'));

    render(<Portfolio />);

    await waitFor(() => {
      expect(screen.getByText(/portfolio is temporarily unavailable/i)).toBeInTheDocument();
    });
  });

  it('uses the kidney AI image for the CKD project data', () => {
    const ckdProject = portfolioProjects.earlierProjects.find(
      (project) => project.name === 'Chronic Kidney Disease Detection'
    );

    expect(ckdProject.image_src).toBe('kidney-ai-detection.svg');
  });

  it('keeps publication links in the portfolio project data', () => {
    const languageProject = portfolioProjects.earlierProjects.find(
      (project) => project.name === 'Indian Language Identifier'
    );
    const pedestrianProject = portfolioProjects.earlierProjects.find(
      (project) => project.name === 'Anchor-Free Pedestrian Detection'
    );

    expect(languageProject.paper_links).toEqual([
      {
        label: 'IEEE',
        url: 'https://ieeexplore.ieee.org/abstract/document/8724070'
      }
    ]);
    expect(pedestrianProject.paper_links).toEqual([
      {
        label: 'Springer',
        url: 'https://link.springer.com/chapter/10.1007/978-981-19-2347-0_39'
      }
    ]);
  });

});
