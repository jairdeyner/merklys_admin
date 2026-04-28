import { httpClient } from "@lib/http/axios.instance";
import type { MeResponse } from "../types/auth.types";

export const authService = {
  getMe: async (): Promise<MeResponse> => {
    const { data } = await httpClient.get<MeResponse>("/auth/me");

    return data;
  },
};
