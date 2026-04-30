import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { AuthUser } from "@features/auth/types/auth.types";
import type { UserRole } from "@features/auth/constants/auth.constants";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;

  setHydrated: () => void;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  setUser: (user: AuthUser) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        _hasHydrated: false,

        setHydrated: () =>
          set({ _hasHydrated: true }, undefined, "auth/setHydrated"),

        login: (user, token) =>
          set({ user, token, isAuthenticated: true }, undefined, "auth/login"),

        logout: () =>
          set(
            { user: null, token: null, isAuthenticated: false },
            undefined,
            "auth/logout"
          ),

        hasRole: role => get().user?.roles.includes(role) ?? false,

        setUser: user => set({ user }, undefined, "auth/setUser"),
      }),
      {
        name: "auth-storage",
        partialize: state => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
        onRehydrateStorage: () => {
          return (state, error) => {
            if (!error) {
              state?.setHydrated();
            }
          };
        },
      }
    ),
    {
      name: "AuthStore",
    }
  )
);
