"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import LoadingScreen from "../components/LoadingScreen";
import { localStorageKeys } from "../localStorage.utils";

interface AuthContextType {
  googleToken: string | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem(localStorageKeys.googleToken);
    if (savedToken) setGoogleToken(savedToken);

    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setGoogleToken(tokenResponse.access_token);
      localStorage.setItem(
        localStorageKeys.googleToken,
        tokenResponse.access_token,
      );
    },
    scope: "https://www.googleapis.com/auth/drive.file",
  });

  const logout = () => {
    setGoogleToken(null);
    localStorage.removeItem(localStorageKeys.googleToken);
  };

  if (loading) return <LoadingScreen />;

  return (
    <AuthContext.Provider
      value={{
        googleToken,
        isAuthenticated: !!googleToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
