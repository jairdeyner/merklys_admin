import { QueryProvider } from "./QueryProvider";
import { TooltipProvider } from "./TooltipProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryProvider>
  );
};
