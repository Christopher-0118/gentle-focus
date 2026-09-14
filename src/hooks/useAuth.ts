import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/services/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUser();
        setIsAuthenticated(response.authenticated);
      } catch {
        setError('Failed to load auth status');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  return { error, isAuthenticated, isLoading, setIsAuthenticated };
};
