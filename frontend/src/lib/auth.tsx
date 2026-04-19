"use client";

import { api } from "@lib/api";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextValue {
  token: string | null;
  isOwner: boolean;
  ready: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    if (stored) setToken(stored);
    setReady(true);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const body = new URLSearchParams({
      username,
      password,
      grant_type: "password",
      scope: "",
    });

    const data = await api
      .post("owner/login", {
        body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .json<{ access_token: string; token_type: string }>();

    sessionStorage.setItem("token", data.access_token);
    setToken(data.access_token);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      isOwner: token !== null,
      ready,
      login,
      logout,
    }),
    [token, ready, login, logout],
  );
  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
