import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@lib/query/query-keys";
import { employeeService } from "../services/employee.service";
import type { EmployeeFilters } from "../types/employee.types";

export const useEmployees = (filters: EmployeeFilters) => {
  return useQuery({
    queryKey: queryKeys.employees.list(filters),
    queryFn: () => employeeService.getAll(filters),
  });
};
