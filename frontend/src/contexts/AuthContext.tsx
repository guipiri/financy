import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { graphqlClient } from '@/graphql/client';
import { ME_QUERY } from '@/graphql/documents/user';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    userData: User,
    accessToken: string,
    refreshToken?: string | null,
  ) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(
    (userData: User, accessToken: string, refreshToken?: string | null) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      graphqlClient.setHeader('Authorization', `Bearer ${accessToken}`);
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    graphqlClient.setHeader('Authorization', '');
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function validateToken() {
      const storedToken = localStorage.getItem('accessToken');

      if (storedToken) {
        try {
          graphqlClient.setHeader('Authorization', `Bearer ${storedToken}`);
          const data = await graphqlClient.request(ME_QUERY);

          if (isMounted && data?.me) {
            setUser(data.me);
            localStorage.setItem('user', JSON.stringify(data.me));
          } else if (isMounted) {
            logout();
          }
        } catch (error) {
          console.error('Falha na validação do token no backend:', error);
          if (isMounted) {
            logout();
          }
        }
      } else {
        if (isMounted) {
          logout();
        }
      }

      if (isMounted) {
        setLoading(false);
      }
    }

    validateToken();

    return () => {
      isMounted = false;
    };
  }, [logout]);

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, [logout]);

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
