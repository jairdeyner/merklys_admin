import { ROUTES } from "@/app/routes";
import { ROLE_GROUPS } from "@features/auth/constants/auth.constants";

import {
  Bot,
  Package,
  Shirt,
  ShieldCog,
  Store,
  UserCog,
  Users,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import type { UserRole } from "@features/auth/constants/auth.constants";
import type { ModuleKey } from "@store/ui.store";

export interface NavSubItem {
  title: string;
  url: string;
}

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: NavSubItem[];
}

export interface NavModule {
  label: string;
  icon: LucideIcon;
  description: string;
  allowedRoles: readonly UserRole[];
  items: NavItem[];
}

export const NAV_CONFIG: Record<ModuleKey, NavModule> = {
  administration: {
    label: "Administración",
    icon: UserCog,
    description: "Usuarios, Colaboradores",
    allowedRoles: ROLE_GROUPS.ADMIN_ONLY,
    items: [
      {
        title: "Usuarios",
        url: ROUTES.USERS,
        icon: Users,
        items: [{ title: "Lista", url: ROUTES.USERS }],
      },
      {
        title: "Colaboradores",
        url: ROUTES.EMPLOYEES,
        icon: Bot,
        items: [{ title: "Lista", url: ROUTES.EMPLOYEES }],
      },
      {
        title: "Roles",
        url: "#",
        icon: ShieldCog,
        items: [{ title: "Lista", url: "#" }],
      },
    ],
  },

  inventory: {
    label: "Inventarios",
    icon: Package,
    description: "Stock, Movimientos",
    allowedRoles: ROLE_GROUPS.INVENTORY_ACCESS,
    items: [
      {
        title: "Stock",
        url: ROUTES.INVENTORY.STOCK,
        icon: Package,
        items: [{ title: "General", url: ROUTES.INVENTORY.STOCK }],
      },
      {
        title: "Movimientos",
        url: ROUTES.INVENTORY.MOVEMENTS,
        icon: Package,
        items: [{ title: "Historial", url: ROUTES.INVENTORY.MOVEMENTS }],
      },
    ],
  },

  catalog: {
    label: "Catálogo",
    icon: Shirt,
    description: "Productos, Categorías, Atributos",
    allowedRoles: ROLE_GROUPS.INVENTORY_ACCESS,
    items: [
      {
        title: "Productos",
        url: ROUTES.CATALOG.PRODUCTS,
        icon: Shirt,
        items: [{ title: "Lista", url: ROUTES.CATALOG.PRODUCTS }],
      },
      {
        title: "Categorías",
        url: ROUTES.CATALOG.CATEGORIES,
        icon: Shirt,
        items: [{ title: "Lista", url: ROUTES.CATALOG.CATEGORIES }],
      },
      {
        title: "Atributos",
        url: ROUTES.CATALOG.ATTRIBUTES,
        icon: Shirt,
        items: [{ title: "Lista", url: ROUTES.CATALOG.ATTRIBUTES }],
      },
    ],
  },

  pos: {
    label: "Punto de Venta",
    icon: Store,
    description: "Próximamente",
    allowedRoles: ROLE_GROUPS.POS_ACCESS,
    items: [],
  },
};
