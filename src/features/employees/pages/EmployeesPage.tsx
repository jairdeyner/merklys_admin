import { useCallback, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useEmployees } from "../hooks/useEmployees";
import { EmployeeFilters } from "../components/EmployeeFilters";
import { EmployeeTable } from "../components/EmployeeTable";
import type { EmployeeFilters as EmployeeFiltersType } from "../types/employee.types";
import { useNavigate } from "react-router";

const DEFAULT_FILTERS: EmployeeFiltersType = {
  page: 0,
  size: 10,
};

export const EmployeesPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<EmployeeFiltersType>(DEFAULT_FILTERS);

  const { data, isLoading } = useEmployees(filters);

  const handleFiltersChange = useCallback(
    (partial: Partial<EmployeeFiltersType>) => {
      setFilters(prev => ({ ...prev, ...partial }));
    },
    []
  );

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleSizeChange = (size: number) => {
    setFilters(prev => ({ ...prev, size, page: 0 }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Colaboradores</h1>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/employees/new")}
        >
          Nuevo colaborador
        </Button>
      </div>

      <EmployeeFilters filters={filters} onChange={handleFiltersChange} />

      <EmployeeTable
        data={data?.content ?? []}
        isLoading={isLoading}
        page={data?.page ?? 0}
        size={data?.size ?? 10}
        totalElements={data?.totalElements ?? 0}
        totalPages={data?.totalPages ?? 0}
        onPageChange={handlePageChange}
        onSizeChange={handleSizeChange}
      />
    </div>
  );
};
