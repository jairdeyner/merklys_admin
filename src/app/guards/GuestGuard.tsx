import type { JSX } from "react";
import { Navigate } from "react-router";

import { useAuthStore } from "@store/auth.store";

import { ROUTES } from "../routes";

interface GuestGuardProps {
  children: JSX.Element;
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const token = useAuthStore(state => state.token);

  if (isAuthenticated && token) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
};
