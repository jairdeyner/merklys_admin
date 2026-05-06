import type { ColumnDef } from "@tanstack/react-table";

import type { EmployeeSummary } from "../types/employee.types";
import type { UserRole } from "@features/auth/constants/auth.constants";
import { Badge } from "@/shared/components/ui/badge";
import { EmployeeStatusBadge } from "./EmployeeStatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { MoreVertical } from "lucide-react";

const ROLE_LABELS: Record<UserRole, string> = {
  ADMINISTRADOR: "Administrador",
  INVENTARIO: "Inventario",
  VENDEDOR: "Vendedor",
  COLABORADOR: "Colaborador",
};

export const employeeColumns: ColumnDef<EmployeeSummary>[] = [
  {
    id: "employee",
    header: "Colaborador",
    cell: ({ row }) => {
      const { firstName, lastName, username } = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {firstName} {lastName}
          </span>
          <span className="text-sm text-muted-foreground">{username}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dni",
    header: "DNI",
  },
  {
    accessorKey: "position",
    header: "Cargo",
  },
  {
    id: "roles",
    header: "Roles",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.roles.map(role => (
          <Badge key={role} variant="outline">
            {ROLE_LABELS[role]}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    id: "status",
    header: "Estado",
    cell: ({ row }) => (
      <EmployeeStatusBadge
        isActive={row.original.isActive}
        isLocked={row.original.isLocked}
      />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abir menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(employee.id + "")}
            >
              Ver perfil
            </DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Bloquear</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Inactivar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
