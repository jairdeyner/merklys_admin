import { Outlet } from "react-router";

import { ProgressBar } from "@shared/components/feedback/ProgressBar";

export const RootLayout = () => {
  return (
    <>
      <ProgressBar />
      <Outlet />
    </>
  );
};
