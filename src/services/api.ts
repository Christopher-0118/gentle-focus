import { AuthResponse } from '@/types/auth';

const API_URL = import.meta.env.VITE_API_URL;

export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/auth/google`;
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: 'include',
  });
  return response.json();
};

export const logOut = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to log out');
  }
};

export const submitForm = async (prompt: string) => {
  const response = await fetch(`${API_URL}/chat/create-event`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit');
  }

  return response.json();
};
