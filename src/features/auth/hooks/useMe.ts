import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@store/auth.store";
import { queryKeys } from "@/lib/query/query-keys";
import { authService } from "../services/auth.service";
import type { MeResponse } from "../types/auth.types";
import type { AxiosError } from "axios";

export const useMe = () => {
  const token = useAuthStore(state => state.token);

  return useQuery<MeResponse, AxiosError>({
    queryKey: queryKeys.auth.me(),
    queryFn: authService.getMe,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
