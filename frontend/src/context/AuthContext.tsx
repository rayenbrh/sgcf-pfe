import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { AuthUser, AuthState, LoginCredentials } from '@/types/auth';
import api from '@/lib/api';

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type MeResponse = { success: boolean; message: string; data: AuthUser };
type LoginApiResponse = { success: boolean; message: string; data: { token: string; user: AuthUser } };

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const restore = async () => {
      const token = localStorage.getItem('sgcf_token');
      const userRaw = localStorage.getItem('sgcf_user');

      if (!token || !userRaw) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        const { data: body } = await api.get<MeResponse>('/auth/me');
        const user = body.data;
        localStorage.setItem('sgcf_user', JSON.stringify(user));
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem('sgcf_token');
        localStorage.removeItem('sgcf_user');
        setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
      }
    };

    void restore();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { data: body } = await api.post<LoginApiResponse>('/auth/login', credentials);
    const { token, user } = body.data;

    localStorage.setItem('sgcf_token', token);
    localStorage.setItem('sgcf_user', JSON.stringify(user));

    setState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('sgcf_token');
    localStorage.removeItem('sgcf_user');
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    window.location.href = '/login';
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
