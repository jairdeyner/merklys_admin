import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@shared/components/ui/sidebar";

import { BrandSwitcher } from "./BrandSwitcher";
import { NavMain } from "./NavMain";
import { NavReports } from "./NavReports";
import { NavUser } from "./NavUser";

import {
  BookUser,
  Bot,
  Package,
  ShieldCog,
  ShoppingCart,
  Store,
  UserCog,
  Users,
} from "lucide-react";

// This is sample data.
const data = {
  user: {
    name: "jair.tello",
    email: "jair.tello@merklys.com",
    avatar: "/avatars/shadcn.jpg",
  },
  brands: [
    {
      name: "Usuarios",
      logo: UserCog,
      plan: "Administración",
    },
    {
      name: "Inventarios",
      logo: Package,
      plan: "Administración",
    },
    {
      name: "POS",
      logo: Store,
      plan: "Punto de Venta",
    },
    {
      name: "E-commerce",
      logo: ShoppingCart,
      plan: "Administración",
    },
  ],
  navMain: [
    {
      title: "Usuarios",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Lista",
          url: "#",
        },
        {
          title: "Bloqueados",
          url: "#",
        },
      ],
    },
    {
      title: "Colaboradores",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Lista",
          url: "#",
        },
        {
          title: "Nuevo",
          url: "#",
        },
      ],
    },
    {
      title: "Clientes",
      url: "#",
      icon: BookUser,
      items: [
        {
          title: "Lista",
          url: "#",
        },
        {
          title: "Nuevo",
          url: "#",
        },
      ],
    },
    {
      title: "Roles",
      url: "#",
      icon: ShieldCog,
      items: [
        {
          title: "Lista",
          url: "#",
        },
        {
          title: "Nuevo",
          url: "#",
        },
      ],
    },
  ],
  reports: [
    {
      name: "Nuevo: Colaoborador",
      url: "#",
      icon: Bot,
    },
    {
      name: "Editar: Colaoborador",
      url: "#",
      icon: Bot,
    },
  ],
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BrandSwitcher brands={data.brands} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavReports reports={data.reports} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
