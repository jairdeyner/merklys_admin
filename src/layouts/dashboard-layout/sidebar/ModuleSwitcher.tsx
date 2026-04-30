import { useAuthStore } from "@store/auth.store";
import { useUiStore, type ModuleKey } from "@store/ui.store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@shared/components/ui/sidebar";

import { ChevronsUpDown, Moon } from "lucide-react";
import { NAV_CONFIG, type NavModule } from "./nav.config";

export function ModuleSwitcher() {
  const { isMobile } = useSidebar();

  const activeModule = useUiStore(state => state.activeModule);
  const setActiveModule = useUiStore(state => state.setActiveModule);
  const hasRole = useAuthStore(state => state.hasRole);

  const allowedModules = (
    Object.entries(NAV_CONFIG) as [ModuleKey, NavModule][]
  ).filter(([, module]) => module.allowedRoles.some(role => hasRole(role)));

  let activeConfig = NAV_CONFIG[activeModule];

  const hasModuleAccess = allowedModules.some(([key]) => key === activeModule);

  if (!hasModuleAccess) {
    activeConfig = NAV_CONFIG[allowedModules[0][0]];
    setActiveModule(allowedModules[0][0]);
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeConfig.icon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeConfig.label}
                </span>
                <span className="truncate text-xs">
                  {activeConfig.description}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Módulos
            </DropdownMenuLabel>
            {allowedModules.map(([key, module], index) => (
              <DropdownMenuItem
                key={key}
                onClick={() => setActiveModule(key)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <module.icon className="size-3.5 shrink-0" />
                </div>
                {module.label}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Moon className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Modo Oscuro
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
