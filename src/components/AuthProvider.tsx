import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { getCurrentUser, loginWithGoogle, logOut } from '@/services/auth.service';
import type { AuthContextValue } from '@/types/auth.types';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<Omit<AuthContextValue, 'login' | 'logout'>>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      try {
        const response = await getCurrentUser();
        if (!active) return;

        setAuthState({
          user: response.authenticated ? response.user : null,
          isAuthenticated: response.authenticated,
          isLoading: false,
          error: null,
        });
      } catch {
        if (!active) return;

        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to load auth status',
        });
      }
    };

    void loadUser();

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(() => {
    if (authState.isLoading) return;

    loginWithGoogle();
  }, [authState.isLoading]);

  const logout = useCallback(async () => {
    if (authState.isLoading) return;

    setAuthState((previous) => ({ ...previous, isLoading: true, error: null }));

    try {
      await logOut();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch {
      setAuthState((previous) => ({
        ...previous,
        isLoading: false,
        error: 'Failed to log out',
      }));
    }
  }, [authState.isLoading]);

  const value = useMemo(() => ({ ...authState, login, logout }), [authState, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
