export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
  },

  DASHBOARD: "/",

  CATALOG: {
    PRODUCTS: "/catalog/products",
    CATEGORIES: "/catalog/categories",
    ATTRIBUTES: "/catalog/attributes",
  },

  INVENTORY: {
    ROOT: "/inventory",
    STOCK: "/inventory/stock",
    LOCATIONS: "/inventory/locations",
    MOVEMENTS: "/inventory/movements",
  },

  EMPLOYEES: "/employees",

  USERS: "/users",

  POS: "/pos",
} as const;
