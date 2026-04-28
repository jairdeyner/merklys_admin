import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@store/auth.store";
import { queryKeys } from "@/lib/query/query-keys";
import { authService } from "../services/auth.service";

export const useMe = () => {
  const token = useAuthStore(state => state.token);

  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: authService.getMe,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
