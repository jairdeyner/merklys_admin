import { z } from "zod";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const moduleKeySchema = z.enum([
  "administration",
  "inventory",
  "catalog",
  "pos",
]);

export type ModuleKey = z.infer<typeof moduleKeySchema>;

interface UiState {
  activeModule: ModuleKey;

  setActiveModule: (module: ModuleKey) => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      set => ({
        activeModule: "administration",

        setActiveModule: module =>
          set({ activeModule: module }, undefined, "ui/setActiveModule"),
      }),
      {
        name: "ui-storage",
        partialize: state => ({
          activeModule: state.activeModule,
        }),
        onRehydrateStorage: () => {
          return state => {
            if (state) {
              const result = moduleKeySchema.safeParse(state.activeModule);
              if (!result.success) {
                state.activeModule = "administration";
              }
            }
          };
        },
      }
    ),
    {
      name: "UiStore",
    }
  )
);
