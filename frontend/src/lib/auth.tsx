"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { api } from "@lib/api";

interface AuthContextValue {
  token: string | null;
  isOwner: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

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

    setToken(data.access_token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      isOwner: token !== null,
      login,
      logout,
    }),
    [token, login, logout],
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
