import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the Layout header without crashing', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
