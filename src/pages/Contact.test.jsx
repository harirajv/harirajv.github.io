import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';

vi.mock('@emailjs/browser', () => ({
  default: { sendForm: vi.fn() }
}));
import emailjs from '@emailjs/browser';

describe('Contact', () => {
  it('renders the contact form with all required fields and a submit button', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('#contact')).toBeInTheDocument();
    expect(container.querySelector('input[name="user_name"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="user_email"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="subject"]')).toBeInTheDocument();
    expect(container.querySelector('textarea[name="message"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });
});

describe('Contact form interactions', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('FORM-01: reflects typed values in all four fields', async () => {
    const user = userEvent.setup();
    const { container } = render(<Contact />);

    const nameInput = container.querySelector('input[name="user_name"]');
    const emailInput = container.querySelector('input[name="user_email"]');
    const subjectInput = container.querySelector('input[name="subject"]');
    const messageInput = container.querySelector('textarea[name="message"]');

    await user.type(nameInput, 'Hari');
    await user.type(emailInput, 'hari@example.com');
    await user.type(subjectInput, 'Hello');
    await user.type(messageInput, 'Test message body');

    expect(nameInput).toHaveValue('Hari');
    expect(emailInput).toHaveValue('hari@example.com');
    expect(subjectInput).toHaveValue('Hello');
    expect(messageInput).toHaveValue('Test message body');
  });

  it('FORM-02: calls emailjs.sendForm once with the form element and typed values', async () => {
    // Use a pending (never-resolving) promise so the success path does not run
    // form.current.reset() before we read back FormData from the captured form node.
    emailjs.sendForm.mockReturnValueOnce(new Promise(() => {}));
    const user = userEvent.setup();
    const { container } = render(<Contact />);

    await user.type(container.querySelector('input[name="user_name"]'), 'Hari');
    await user.type(container.querySelector('input[name="user_email"]'), 'hari@example.com');
    await user.type(container.querySelector('input[name="subject"]'), 'Hello');
    await user.type(container.querySelector('textarea[name="message"]'), 'Test message body');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
    expect(emailjs.sendForm).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(HTMLFormElement),
      expect.any(Object)
    );

    const formArg = emailjs.sendForm.mock.calls[0][2];
    const fd = new FormData(formArg);
    expect(fd.get('user_name')).toBe('Hari');
    expect(fd.get('user_email')).toBe('hari@example.com');
    expect(fd.get('subject')).toBe('Hello');
    expect(fd.get('message')).toBe('Test message body');
  });

  it('FORM-04: shows success message and clears inputs after a resolved send', async () => {
    emailjs.sendForm.mockResolvedValueOnce({ status: 200, text: 'OK' });
    const user = userEvent.setup();
    const { container } = render(<Contact />);

    const nameInput = container.querySelector('input[name="user_name"]');
    const emailInput = container.querySelector('input[name="user_email"]');
    const subjectInput = container.querySelector('input[name="subject"]');
    const messageInput = container.querySelector('textarea[name="message"]');

    await user.type(nameInput, 'Hari');
    await user.type(emailInput, 'hari@example.com');
    await user.type(subjectInput, 'Hello');
    await user.type(messageInput, 'Test message body');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/has been sent/i)).toBeInTheDocument();
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(subjectInput).toHaveValue('');
    expect(messageInput).toHaveValue('');
  });

  it('FORM-05: shows error message after a rejected send', async () => {
    emailjs.sendForm.mockRejectedValueOnce({ text: 'simulated error' });
    const user = userEvent.setup();
    const { container } = render(<Contact />);

    await user.type(container.querySelector('input[name="user_name"]'), 'Hari');
    await user.type(container.querySelector('input[name="user_email"]'), 'hari@example.com');
    await user.type(container.querySelector('input[name="subject"]'), 'Hello');
    await user.type(container.querySelector('textarea[name="message"]'), 'Test message body');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/failed to send/i)).toBeInTheDocument();
    expect(screen.queryByText(/has been sent/i)).not.toBeInTheDocument();
  });
});
