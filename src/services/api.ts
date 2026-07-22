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
