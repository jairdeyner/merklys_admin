import axios from "axios";
import { httpClient } from "./axios.instance";

import { useAuthStore } from "@store/auth.store";
import { AUTH_ERROR_CODES } from "@features/auth/constants/auth.constants";
import { toast } from "sonner";
import { queryClient } from "../query/query-client";

const ACCOUNT_ERROR_CODES = [
  AUTH_ERROR_CODES.ACCOUNT_DISABLED,
  AUTH_ERROR_CODES.ACCOUNT_LOCKED,
];

const PUBLIC_PATHS = ["/auth/login"];

export function setupInterceptors(): void {
  httpClient.interceptors.request.use(config => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  httpClient.interceptors.response.use(
    response => response,
    error => {
      if (!axios.isAxiosError(error)) {
        return Promise.reject(error);
      }

      const status = error.response?.status;
      const code = error.response?.data?.code;
      const message = error.response?.data?.message;

      if (message) {
        error.message = message;
      }

      const isPublicPath = PUBLIC_PATHS.some(path =>
        error.config?.url?.includes(path)
      );

      if (status === 401 && !isPublicPath) {
        queryClient.clear();
        useAuthStore.getState().logout();
        toast.error(message, { position: "top-center" });
      }

      if (status === 403 && ACCOUNT_ERROR_CODES.includes(code)) {
        queryClient.clear();
        useAuthStore.getState().logout();

        if (!isPublicPath) {
          toast.error(message, { position: "top-center" });
        }
      }

      return Promise.reject(error);
    }
  );
}
