import axios from "axios";
import { httpClient } from "./axios.instance";

import { useAuthStore } from "@store/auth.store";
import { AUTH_ERROR_CODES } from "@features/auth/constants/auth.constants";

const ACCOUNT_ERROR_CODES = [
  AUTH_ERROR_CODES.ACCOUNT_DISABLED,
  AUTH_ERROR_CODES.ACCOUNT_LOCKED,
];

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
      if (axios.isAxiosError(error)) {
        return Promise.reject(error);
      }

      const status = error.response?.status;
      const code = error.response?.data.code;
      const message = error.response?.data.message;

      if (status === 401) {
        useAuthStore.getState().logout();

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }

      if (status === 403 && ACCOUNT_ERROR_CODES.includes(code)) {
        useAuthStore.getState().logout();

        const params = new URLSearchParams();

        if (message) {
          params.set("error", message);
        }

        const queryString = params.toString();

        window.location.href = `/login?${queryString}`;
      }

      return Promise.reject(error);
    }
  );
}
