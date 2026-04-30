import { useAuthStore } from "@/store/auth.store";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = useAuthStore(state => state.logout);

  return () => {
    queryClient.clear();
    logout();
  };
};
