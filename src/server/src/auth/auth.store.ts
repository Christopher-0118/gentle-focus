import type { Credentials } from 'google-auth-library';

let currentTokens: Credentials | null = null;

export const setCurrentTokens = (tokens: Credentials) => {
  currentTokens = tokens;
};

export const getCurrentTokens = () => currentTokens;
