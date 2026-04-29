import { httpClient } from "@lib/http/axios.instance";
import type {
  LoginRequest,
  LoginResponse,
  MeResponse,
} from "../types/auth.types";

export const authService = {
  getMe: async (): Promise<MeResponse> => {
    const { data } = await httpClient.get<MeResponse>("/auth/me");

    return data;
  },

  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await httpClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );

    return data;
  },
};
