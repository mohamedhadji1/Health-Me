import React from 'react';
import { StoredUser, updateUser } from '../utils/userStore';

const SESSION_KEY = 'health_app_session';

interface AuthContextValue {
  user: StoredUser | null;
  login: (user: StoredUser) => void;
  logout: () => void;
  refreshUser: (updated: StoredUser) => void;
}

const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
  refreshUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<StoredUser | null>(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as StoredUser) : null;
    } catch {
      return null;
    }
  });

  const login = (loggedInUser: StoredUser) => {
    setUser(loggedInUser);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(loggedInUser));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const refreshUser = (updated: StoredUser) => {
    updateUser(updated);
    setUser(updated);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;
