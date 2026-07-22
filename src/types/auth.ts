export type User = {
  email: string;
  name: string;
  picture: string;
};

export type AuthResponse = {
  authenticated: boolean;
  user: User | null;
};
