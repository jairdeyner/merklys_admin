import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { USER_ROLES } from "@/features/auth/constants/auth.constants";
import type { EmployeeFilters as EmployeeFiltersType } from "../types/employee.types";
import { Field } from "@/shared/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { SearchIcon } from "lucide-react";

interface EmployeeFiltersProps {
  filters: EmployeeFiltersType;
  onChange: (filters: Partial<EmployeeFiltersType>) => void;
}

const STATUS_OPTIONS = [
  { label: "Activo", value: "active" },
  { label: "Inactivo", value: "inactive" },
  { label: "Bloqueado", value: "locked" },
] as const;

type StatusOption = (typeof STATUS_OPTIONS)[number]["value"];

const parseStatusOption = (
  value: StatusOption
): Partial<EmployeeFiltersType> => {
  switch (value) {
    case "active":
      return { isActive: true, isLocked: undefined };
    case "inactive":
      return { isActive: false, isLocked: undefined };
    case "locked":
      return { isLocked: true, isActive: undefined };
  }
};

export const EmployeeFilters = ({
  filters,
  onChange,
}: EmployeeFiltersProps) => {
  const [search, setSearch] = useState(filters.search ?? "");
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    onChange({ search: debouncedSearch || undefined, page: 0 });
  }, [debouncedSearch, onChange]);

  const handleRoleChange = (value: string) => {
    onChange({
      role:
        value === "all" ? undefined : (value as EmployeeFiltersType["role"]),
      page: 0,
    });
  };

  const handleStatusChange = (value: string) => {
    if (value === "all") {
      onChange({ isActive: undefined, isLocked: undefined, page: 0 });
      return;
    }
    onChange({ ...parseStatusOption(value as StatusOption), page: 0 });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Field className="sm:max-w-xs">
        <InputGroup>
          <InputGroupInput
            id="inline-start-input"
            placeholder="Buscar por nombre, apellido o DNI..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-start">
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
      </Field>

      <div className="flex flex-row gap-3">
        <Select value={filters.role ?? "all"} onValueChange={handleRoleChange}>
          <SelectTrigger className="sm:w-40">
            <SelectValue placeholder="Seleccionar rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los roles</SelectItem>
            {Object.values(USER_ROLES).map(role => (
              <SelectItem key={role} value={role}>
                {role.charAt(0) + role.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={
            filters.isLocked
              ? "locked"
              : filters.isActive === false
                ? "inactive"
                : filters.isActive === true
                  ? "active"
                  : "all"
          }
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="sm:w-40">
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            {STATUS_OPTIONS.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
