import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all form elements', () => {
      render(<LoginForm />);
      
      expect(screen.getByRole('heading', { name: /sign in to your account/i })).toBeInTheDocument();
      expect(screen.getByText(/enter your credentials to continue/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should render email input with correct attributes', () => {
      render(<LoginForm />);
      
      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('name', 'email');
      expect(emailInput).toHaveAttribute('autocomplete', 'email');
      expect(emailInput).toHaveAttribute('required');
    });

    it('should render password input with correct attributes', () => {
      render(<LoginForm />);
      
      const passwordInput = screen.getByLabelText(/password/i);
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('name', 'password');
      expect(passwordInput).toHaveAttribute('autocomplete', 'current-password');
      expect(passwordInput).toHaveAttribute('required');
    });
  });

  describe('Input Validation - Email', () => {
    it('should show error when email is empty on blur', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      
      fireEvent.focus(emailInput);
      fireEvent.blur(emailInput);
      
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
    });

    it('should show error for invalid email format', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      
      await userEvent.type(emailInput, 'invalid-email');
      fireEvent.blur(emailInput);
      
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('should accept valid email format', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      
      await userEvent.type(emailInput, 'test@example.com');
      fireEvent.blur(emailInput);
      
      await waitFor(() => {
        expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
      });
    });

    it('should clear email error when user starts typing', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      
      fireEvent.focus(emailInput);
      fireEvent.blur(emailInput);
      
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
      
      await userEvent.type(emailInput, 't');
      
      await waitFor(() => {
        expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Input Validation - Password', () => {
    it('should show error when password is empty on blur', async () => {
      render(<LoginForm />);
      const passwordInput = screen.getByLabelText(/password/i);
      
      fireEvent.focus(passwordInput);
      fireEvent.blur(passwordInput);
      
      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
    });

    it('should show error when password is too short', async () => {
      render(<LoginForm />);
      const passwordInput = screen.getByLabelText(/password/i);
      
      await userEvent.type(passwordInput, '12345');
      fireEvent.blur(passwordInput);
      
      await waitFor(() => {
        expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
      });
    });

    it('should accept password with 6 or more characters', async () => {
      render(<LoginForm />);
      const passwordInput = screen.getByLabelText(/password/i);
      
      await userEvent.type(passwordInput, '123456');
      fireEvent.blur(passwordInput);
      
      await waitFor(() => {
        expect(screen.queryByText(/password must be at least 6 characters/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should show validation errors when submitting empty form', async () => {
      render(<LoginForm />);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
    });

    it('should not submit form with invalid email', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await userEvent.type(emailInput, 'invalid-email');
      await userEvent.type(passwordInput, 'password123');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('should not submit form with short password', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, '12345');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
      });
    });

    it('should show loading state during submission', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'password123');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/signing in\.\.\./i)).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
      });
    });

    it('should disable inputs during submission', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'password123');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(emailInput).toBeDisabled();
        expect(passwordInput).toBeDisabled();
      });
    });
  });

  describe('Error Display', () => {
    it('should display error messages with proper ARIA attributes', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      
      fireEvent.focus(emailInput);
      fireEvent.blur(emailInput);
      
      await waitFor(() => {
        const errorMessage = screen.getByText(/email is required/i);
        expect(errorMessage).toHaveAttribute('role', 'alert');
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
        expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
      });
    });

    it('should apply error styling to invalid inputs', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      
      fireEvent.focus(emailInput);
      fireEvent.blur(emailInput);
      
      await waitFor(() => {
        expect(emailInput).toHaveClass('form-input--error');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper form structure', () => {
      render(<LoginForm />);
      
      const form = screen.getByRole('button', { name: /sign in/i }).closest('form');
      expect(form).toHaveAttribute('novalidate');
    });

    it('should associate labels with inputs', () => {
      render(<LoginForm />);
      
      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      
      expect(emailInput).toHaveAttribute('id', 'email');
      expect(passwordInput).toHaveAttribute('id', 'password');
    });

    it('should have aria-busy attribute on submit button during loading', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'password123');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(submitButton).toHaveAttribute('aria-busy', 'true');
      });
    });
  });
});
