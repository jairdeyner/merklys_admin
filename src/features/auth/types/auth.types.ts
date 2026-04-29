import type { UserRole } from "../constants/auth.constants";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  roles: UserRole[];
}

export interface MeResponse {
  id: number;
  username: string;
  email: string;
  roles: UserRole[];
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  tokenType: string;
  accessToken: string;
  user: AuthUser;
}
