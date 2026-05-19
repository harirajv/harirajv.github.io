import { render, waitFor } from '@testing-library/react';
import Portfolio from './Portfolio';

describe('Portfolio', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ projects: [] })
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the portfolio section after fetch resolves', async () => {
    const { container } = render(<Portfolio />);
    await waitFor(() => expect(container.querySelector('#portfolio')).toBeInTheDocument());
  });
});
