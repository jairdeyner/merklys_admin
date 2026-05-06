import type { UserRole } from "@/features/auth/constants/auth.constants";

export interface EmployeeSummary {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  position: string;
  username: string;
  roles: UserRole[];
  isActive: boolean;
  isLocked: boolean;
}

export interface EmployeeFilters {
  search?: string;
  role?: UserRole;
  isActive?: boolean;
  isLocked?: boolean;
  page: number;
  size: number;
  sort?: string;
}
