import type { Credentials } from 'google-auth-library';

type AuthUser = {
  id?: string;
  email?: string;
  name?: string;
  picture?: string;
};

let currentTokens: Credentials | null = null;
// TODO MVP2: replace global auth state with per-user server sessions.
// Development-only: supports a single local user.
let currentUser: AuthUser | null = null;

export const setCurrentTokens = (tokens: Credentials) => {
  currentTokens = tokens;
};

export const getCurrentTokens = () => currentTokens;

export const setCurrentUser = (user: AuthUser) => {
  currentUser = user;
};

export const getCurrentUser = () => currentUser;

export const clearAuth = () => {
  currentUser = null;
  currentTokens = null;
};
