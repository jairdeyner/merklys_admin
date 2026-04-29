import { Outlet } from "react-router";

import { ProgressBar } from "@shared/components/feedback/ProgressBar";
import { Toaster } from "@shared/components/ui/sonner";

export const RootLayout = () => {
  return (
    <>
      <ProgressBar />
      <Outlet />

      <Toaster richColors />
    </>
  );
};
