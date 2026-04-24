import axios from "axios";
import { httpClient } from "./axios.instance";

import { useAuthStore } from "@store/auth.store";

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
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        useAuthStore.getState().logout();

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );
}
