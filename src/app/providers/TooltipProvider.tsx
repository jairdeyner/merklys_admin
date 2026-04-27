import { TooltipProvider as BaseTooltipProvider } from "@/shared/components/ui/tooltip";

interface TooltipProviderProps {
  children: React.ReactNode;
}

export const TooltipProvider = ({ children }: TooltipProviderProps) => {
  return <BaseTooltipProvider>{children}</BaseTooltipProvider>;
};
