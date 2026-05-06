import { httpClient } from "@lib/http/axios.instance";
import type { PagedResponse } from "@shared/types/api.types";
import type { EmployeeFilters, EmployeeSummary } from "../types/employee.types";

export const employeeService = {
  getAll: async (
    filters: EmployeeFilters
  ): Promise<PagedResponse<EmployeeSummary>> => {
    const params: EmployeeFilters = {
      page: filters.page,
      size: filters.size,
    };

    if (filters.search) params.search = filters.search;
    if (filters.role) params.role = filters.role;
    if (filters.sort) params.sort = filters.sort;
    if (filters.isActive !== undefined) params.isActive = filters.isActive;
    if (filters.isLocked !== undefined) params.isLocked = filters.isLocked;

    const { data } = await httpClient.get<PagedResponse<EmployeeSummary>>(
      "/employees",
      { params }
    );

    return data;
  },
};
