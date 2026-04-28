import type { JSX } from "react";

import { useAuthStore } from "@store/auth.store";
import { UnauthorizedPage } from "@shared/components/UnauthorizedPage";

import type { UserRole } from "@features/auth/constants/auth.constants";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: JSX.Element;
}

export const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const hasRole = useAuthStore(state => state.hasRole);

  const isAllowed = allowedRoles.some(role => hasRole(role));

  if (!isAllowed) {
    return <UnauthorizedPage />;
  }

  return children;
};
