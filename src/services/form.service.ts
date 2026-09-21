import type { CreateEventResponse } from '@/types/chat.types';

const API_URL = import.meta.env.VITE_API_URL;

export const submitForm = async (prompt: string): Promise<CreateEventResponse> => {
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
