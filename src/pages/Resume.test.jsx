import { render } from '@testing-library/react';
import Resume from './Resume';

describe('Resume', () => {
  it('renders the resume section', () => {
    const { container } = render(<Resume />);
    expect(container.querySelector('#resume')).toBeInTheDocument();
  });
});
