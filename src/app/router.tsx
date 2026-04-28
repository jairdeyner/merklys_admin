import { createBrowserRouter, Outlet } from "react-router";

import { ROUTES } from "./routes";

import { AuthLayout } from "@layouts/auth-layout";
import { RootLayout } from "@layouts/root-layout";
import { DashboardLayout } from "@layouts/dashboard-layout";
import { NotFoundPage } from "@shared/components/NotFoundPage";

import { AuthGuard, GuestGuard, RoleGuard } from "./guards";
import { USER_ROLES } from "@/features/auth/constants/auth.constants";

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
          {
            path: ROUTES.DASHBOARD,
            lazy: {
              Component: async () =>
                (await import("@features/dashboard/pages/DashboardPage"))
                  .DashboardPage,
            },
          },
          {
            path: "employees",
            element: (
              <RoleGuard allowedRoles={[USER_ROLES.ADMINISTRADOR]}>
                <Outlet />
              </RoleGuard>
            ),
            lazy: {
              Component: async () =>
                (await import("@features/employees/pages/EmployeesPage"))
                  .EmployeesPage,
            },
          },
        ],
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
