export type User = {
  email: string;
  name: string;
  picture: string;
};

export type AuthResponse = {
  authenticated: boolean;
  user: User | null;
};

export type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => void;
  logout: () => Promise<void>;
};
