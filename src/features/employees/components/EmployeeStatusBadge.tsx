import { Badge } from "@/shared/components/ui/badge";
import type { EmployeeSummary } from "../types/employee.types";

type EmployeeStatusBadgeProps = Pick<EmployeeSummary, "isActive" | "isLocked">;

export const EmployeeStatusBadge = ({
  isActive,
  isLocked,
}: EmployeeStatusBadgeProps) => {
  if (isLocked) {
    return <Badge variant="destructive">Bloqueado</Badge>;
  }

  if (!isActive) {
    return <Badge variant="secondary">Inactivo</Badge>;
  }

  return <Badge variant="success">Activo</Badge>;
};
