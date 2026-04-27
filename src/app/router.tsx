import { createBrowserRouter } from "react-router";

import { ROUTES } from "./routes";

import { AuthLayout } from "@layouts/auth-layout";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { NotFoundPage } from "@/shared/components/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
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
    element: <DashboardLayout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        lazy: {
          Component: async () =>
            (await import("@features/dashboard/pages/DashboardPage"))
              .DashboardPage,
        },
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />
  }
]);
