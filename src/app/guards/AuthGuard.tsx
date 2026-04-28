import { useEffect, type JSX } from "react";
import { Navigate } from "react-router";

import { useAuthStore } from "@store/auth.store";

import { ROUTES } from "../routes";
import { useMe } from "@features/auth/hooks/useMe";

interface AuthGuardProps {
  children: JSX.Element;
}

/**
 * Protege rutas que requieren autenticación.
 *
 * Flujo:
 * 1. Sin token o sesión → redirige a /login
 * 2. Primera carga → verifica con GET /auth/me → muestra spinner
 * 3. Error de red/servidor → redirige a /login
 * 4. Éxito → sincroniza store y renderiza children
 *
 * Nota: Los errores 401 y 403 (cuenta bloqueada/deshabilitada)
 * son manejados por el interceptor de Axios antes de llegar aquí.
 *
 * @see axios.interceptors.ts
 * @see useMe.ts
 */
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const token = useAuthStore(state => state.token);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const setUser = useAuthStore(state => state.setUser);

  const { data, isLoading, isError } = useMe();

  useEffect(() => {
    if (data && token) {
      setUser(data);
    }
  }, [data, token, setUser]);

  if (!isAuthenticated || !token) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return children;
};
