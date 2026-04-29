import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { authService } from "../services/auth.service";
import { useAuthStore } from "@/store/auth.store";

import type { LoginRequest } from "../types/auth.types";
import { ROUTES } from "@/app/routes";

export const useLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: ({ user, accessToken }) => {
      login(user, accessToken);

      navigate(ROUTES.DASHBOARD, { replace: true });
    },
  });
};
