import { createBrowserRouter, Outlet } from "react-router";

import { ROUTES } from "./routes";

import { AuthLayout } from "@layouts/auth-layout";
import { RootLayout } from "@layouts/root-layout";
import { DashboardLayout } from "@layouts/dashboard-layout";
import { NotFoundPage } from "@shared/components/NotFoundPage";

import { AuthGuard, GuestGuard, RoleGuard } from "./guards";
import { ROLE_GROUPS } from "@features/auth/constants/auth.constants";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    hydrateFallbackElement: <h1>Loading...</h1>,
    children: [
      {
        element: (
          <GuestGuard>
            <AuthLayout />
          </GuestGuard>
        ),
        children: [
          {
            path: ROUTES.AUTH.LOGIN,
            lazy: {
              Component: async () =>
                (await import("@features/auth/pages/LoginPage")).LoginPage,
            },
          },
        ],
      },

      {
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
        children: [
          // Accesible para todos los roles autenticados
          {
            path: ROUTES.DASHBOARD,
            lazy: {
              Component: async () =>
                (await import("@features/dashboard/pages/DashboardPage"))
                  .DashboardPage,
            },
          },

          // Administración → solo ADMINISTRADOR
          {
            element: (
              <RoleGuard allowedRoles={ROLE_GROUPS.ADMIN_ONLY}>
                <Outlet />
              </RoleGuard>
            ),
            children: [
              {
                path: ROUTES.EMPLOYEES,
                lazy: {
                  Component: async () =>
                    (await import("@features/employees/pages/EmployeesPage"))
                      .EmployeesPage,
                },
              },
              // {
              //   path: ROUTES.USERS,
              //   lazy: {
              //     Component: async () =>
              //       (await import("@features/users/pages/UsersPage")).UsersPage,
              //   },
              // },
            ],
          },

          // Inventarios y Catálogo → ADMINISTRADOR + INVENTARIO
          // {
          //   element: (
          //     <RoleGuard allowedRoles={ROLE_GROUPS.INVENTORY_ACCESS}>
          //       <Outlet />
          //     </RoleGuard>
          //   ),
          //   children: [
          //     {
          //       path: ROUTES.INVENTORY.ROOT,
          //       lazy: {
          //         Component: async () =>
          //           (await import("@features/inventory/pages/InventoryDashboardPage"))
          //             .InventoryDashboardPage,
          //       },
          //     },
          //     {
          //       path: ROUTES.INVENTORY.STOCK,
          //       lazy: {
          //         Component: async () =>
          //           (await import("@features/inventory/pages/StockPage"))
          //             .StockPage,
          //       },
          //     },
          //     {
          //       path: ROUTES.INVENTORY.LOCATIONS,
          //       lazy: {
          //         Component: async () =>
          //           (await import("@features/inventory/pages/LocationsPage"))
          //             .LocationsPage,
          //       },
          //     },
          //     {
          //       path: ROUTES.INVENTORY.MOVEMENTS,
          //       lazy: {
          //         Component: async () =>
          //           (await import("@features/inventory/pages/MovementsPage"))
          //             .MovementsPage,
          //       },
          //     },
          //     {
          //       path: ROUTES.CATALOG.PRODUCTS,
          //       lazy: {
          //         Component: async () =>
          //           (await import("@features/catalog/pages/ProductsPage"))
          //             .ProductsPage,
          //       },
          //     },
          //     {
          //       path: ROUTES.CATALOG.CATEGORIES,
          //       lazy: {
          //         Component: async () =>
          //           (await import("@features/catalog/pages/CategoriesPage"))
          //             .CategoriesPage,
          //       },
          //     },
          //     {
          //       path: ROUTES.CATALOG.ATTRIBUTES,
          //       lazy: {
          //         Component: async () =>
          //           (await import("@features/catalog/pages/AttributesPage"))
          //             .AttributesPage,
          //       },
          //     },
          //   ],
          // },

          // POS → ADMINISTRADOR + VENDEDOR
          // {
          //   element: (
          //     <RoleGuard allowedRoles={ROLE_GROUPS.POS_ACCESS}>
          //       <Outlet />
          //     </RoleGuard>
          //   ),
          //   children: [
          //     {
          //       path: ROUTES.POS,
          //       lazy: {
          //         Component: async () =>
          //           (await import("@features/pos/pages/PosPage")).PosPage,
          //       },
          //     },
          //   ],
          // },
        ],
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
