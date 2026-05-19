import { render } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('renders the about section', () => {
    const { container } = render(<About />);
    expect(container.querySelector('#about')).toBeInTheDocument();
  });
});
