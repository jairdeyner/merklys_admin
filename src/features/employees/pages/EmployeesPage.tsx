import { Link } from "react-router";

import { ROUTES } from "@/app/routes";

export const EmployeesPage = () => {
  return (
    <div>
      <div>EmployeesPage | MERKLYS</div>
      <Link to={ROUTES.AUTH.LOGIN}>Login</Link>
    </div>
  );
};
