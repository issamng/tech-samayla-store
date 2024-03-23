import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUpPage from '../../pages/signup';

describe('SignUpPage', () => {
  it('renders form fields', () => {
    const { getByPlaceholderText } = render(<SignUpPage />);
    expect(getByPlaceholderText('Prénom')).toBeInTheDocument();
    expect(getByPlaceholderText('Nom')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Mot de passe')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUpPage />);
    fireEvent.change(getByPlaceholderText('Prénom'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('Nom'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByPlaceholderText('Mot de passe'), { target: { value: 'password123_' } });
    fireEvent.click(getByText('Valider'));

    await waitFor(() => {
      expect(getByText('Votre inscription a été effectuée avec succès.')).toBeInTheDocument();
    });
  });

  it('displays error message for invalid email', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUpPage />);
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'invalidemail@' } });
    fireEvent.click(getByText('Valider'));

    await waitFor(() => {
      expect(getByText("L'adresse email saisie n'est pas valide.")).toBeInTheDocument();
    });
  });

  it('displays error message for missing required fields', async () => {
    const { getByText } = render(<SignUpPage />);
    fireEvent.click(getByText('Valider'));

    await waitFor(() => {
      expect(getByText('Entrez votre nom')).toBeInTheDocument();
      expect(getByText('Entrez votre prénom')).toBeInTheDocument();
      expect(getByText('Entrez votre email')).toBeInTheDocument();
      expect(getByText('Entrez votre mot de passe')).toBeInTheDocument();
    });
  });

});
