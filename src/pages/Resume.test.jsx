import { render, screen } from '@testing-library/react';
import Resume from './Resume';

describe('Resume', () => {
  it('renders the Google Drive resume preview and download link', () => {
    const { container } = render(<Resume />);
    expect(container.querySelector('#resume')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^resume$/i })).toBeInTheDocument();
    expect(screen.getByTitle(/resume preview/i)).toHaveAttribute(
      'src',
      'https://drive.google.com/file/d/1zMuTmlzUL0fHbagxCjJXbjIXN0-Wwb9U/preview'
    );
    expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute(
      'href',
      'https://drive.google.com/uc?export=download&id=1zMuTmlzUL0fHbagxCjJXbjIXN0-Wwb9U'
    );
    expect(screen.queryByRole('heading', { name: /platform engineering proof/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /education/i })).not.toBeInTheDocument();
  });
});
