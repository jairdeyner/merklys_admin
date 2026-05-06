import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { employeeColumns } from "./EmployeeColumns";
import type { EmployeeSummary } from "../types/employee.types";

type EmployeeTableProps = {
  data: EmployeeSummary[];
  isLoading: boolean;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
};

const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;

const getPageNumbers = (
  current: number,
  total: number
): (number | "ellipsis")[] => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i);

  if (current <= 2) return [0, 1, 2, "ellipsis", total - 1];
  if (current >= total - 3)
    return [0, "ellipsis", total - 3, total - 2, total - 1];

  return [
    0,
    "ellipsis",
    current - 1,
    current,
    current + 1,
    "ellipsis",
    total - 1,
  ];
};

export const EmployeeTable = ({
  data,
  isLoading,
  page,
  size,
  totalElements,
  totalPages,
  onPageChange,
  onSizeChange,
}: EmployeeTableProps) => {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: employeeColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  const pageNumbers = getPageNumbers(page, totalPages);
  const from = totalElements === 0 ? 0 : page * size + 1;
  const to = Math.min((page + 1) * size, totalElements);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={employeeColumns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  Cargando colaboradores...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={employeeColumns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  No se encontraron colaboradores.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            Mostrando {from}-{to} de {totalElements} colaboradores
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Filas por página</span>
            <Select
              value={String(size)}
              onValueChange={val => onSizeChange(Number(val))}
            >
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map(opt => (
                  <SelectItem key={opt} value={String(opt)}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange(0)}
                  aria-disabled={page === 0}
                  className={
                    page === 0
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                >
                  «
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(page - 1)}
                  aria-disabled={page === 0}
                  className={
                    page === 0
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {pageNumbers.map((p, i) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === page}
                      onClick={() => onPageChange(p)}
                      className="cursor-pointer"
                    >
                      {p + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => onPageChange(page + 1)}
                  aria-disabled={page >= totalPages - 1}
                  className={
                    page >= totalPages - 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange(totalPages - 1)}
                  aria-disabled={page >= totalPages - 1}
                  className={
                    page >= totalPages - 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                >
                  »
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};
