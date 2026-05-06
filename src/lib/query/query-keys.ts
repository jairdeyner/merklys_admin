import type { EmployeeFilters } from "@/features/employees/types/employee.types";

export const queryKeys = {
  auth: {
    all: () => ["auth"] as const,
    me: () => ["auth", "me"] as const,
  },
  employees: {
    all: () => ["employees"] as const,
    list: (filters: EmployeeFilters) => ["employees", "list", filters] as const,
  },
} as const;
