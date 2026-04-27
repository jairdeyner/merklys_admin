import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserRole } from "@features/auth/types/auth.types";

interface AuthUser {
  id: number;
  username: string;
  email: string;
  roles: UserRole[];
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => set({ user, token, isAuthenticated: true }),

      logout: () => set({ user: null, token: null, isAuthenticated: false }),

      hasRole: role => get().user?.roles.includes(role) ?? false,
    }),
    {
      name: "auth-storage",
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
