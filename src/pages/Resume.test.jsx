import { render, screen } from '@testing-library/react';
import Resume from './Resume';

describe('Resume', () => {
  it('renders the Google Drive resume preview and download link', () => {
    const { container } = render(<Resume />);
    expect(container.querySelector('#resume')).toBeInTheDocument();
    expect(screen.getByText(/^Career record$/)).toHaveClass('section-kicker');
    expect(screen.getByRole('heading', { name: /^experience, roles, and impact\.$/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /^resume$/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/view the latest resume below/i)).not.toBeInTheDocument();
    expect(screen.getByText(/a current copy is embedded below/i)).toBeInTheDocument();
    expect(screen.getByTitle(/embedded career document/i)).toHaveAttribute(
      'src',
      'https://drive.google.com/file/d/1zMuTmlzUL0fHbagxCjJXbjIXN0-Wwb9U/preview'
    );
    const downloadLink = screen.getByRole('link', { name: /download resume/i });
    expect(downloadLink).toHaveAttribute(
      'href',
      'https://drive.google.com/uc?export=download&id=1zMuTmlzUL0fHbagxCjJXbjIXN0-Wwb9U'
    );
    expect(downloadLink).toHaveClass('icon-download-button');
    expect(downloadLink).toHaveTextContent('');
    expect(screen.queryByRole('heading', { name: /platform engineering proof/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /education/i })).not.toBeInTheDocument();
  });
});
