import { createElement, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";
import { Check, Lock } from "lucide-react";

export interface MultiSelectCategoryItem {
  id: string;
  name: string;
  icon: IconType | ReactNode;
  disabled?: boolean;
  recommended?: boolean;
}

export interface MultiSelectCategory {
  label: string;
  items: MultiSelectCategoryItem[];
}

interface MultiSelectCardGroupProps {
  categories: MultiSelectCategory[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  disabledIds?: Set<string>;
}

export function MultiSelectCardGroup({
  categories,
  selectedIds,
  onToggle,
  disabledIds = new Set(),
}: MultiSelectCardGroupProps) {
  return (
    <div className="flex flex-col items-center w-full h-full gap-8 overflow-y-auto py-6">
      {categories.map((category) => {
        const itemsWithDisabled = category.items.map((item) => ({
          ...item,
          disabled: item.disabled ?? disabledIds.has(item.id),
        }));

        return (
          <div
            key={category.label}
            className="flex flex-col items-center gap-4 w-full max-w-2xl"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-4 justify-center w-full">
              {itemsWithDisabled.map((item) => {
                const isSelected = selectedIds.has(item.id);
                const isDisabled = item.disabled ?? false;

                return (
                  <div
                    key={item.id}
                    onClick={() => !isDisabled && onToggle(item.id)}
                    className={cn(
                      "relative flex cursor-pointer flex-col items-center justify-center gap-3 border rounded-2xl w-44 h-40 transition-all duration-300 group",
                      isDisabled &&
                        "opacity-40 pointer-events-none cursor-not-allowed",
                      isSelected
                        ? "border-foreground bg-foreground/10 shadow-lg shadow-foreground/5"
                        : "border-border bg-foreground/5 hover:border-foreground/30 hover:bg-foreground/8 hover:shadow-md",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300",
                        isSelected
                          ? "bg-foreground/15"
                          : "bg-foreground/5 group-hover:bg-foreground/10",
                      )}
                    >
                      {typeof item.icon === "function"
                        ? createElement(item.icon, {
                            className: "w-7 h-7 text-foreground",
                          })
                        : item.icon}
                    </div>

                    <p className="text-sm font-medium text-foreground text-center leading-tight px-2">
                      {item.name}
                    </p>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-foreground flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-background" />
                      </motion.div>
                    )}

                    {isDisabled && (
                      <span className="absolute -top-2 -right-2 bg-muted text-muted-foreground text-[10px] px-2 py-0.5 rounded-full border font-medium">
                        Coming Soon
                      </span>
                    )}

                    {item.recommended && !isDisabled && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-[9px] px-2 py-0.5 rounded-full font-semibold tracking-wider">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export interface MultiSelectCategoryCheckbox {
  label: string;
  items: {
    id: string;
    name: string;
    icon: IconType | ReactNode;
    disabled?: boolean;
    recommended?: boolean;
  }[];
}

interface CheckboxGroupContainerProps {
  categories: MultiSelectCategoryCheckbox[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  disabledIds?: Set<string>;
  lockedIds?: Set<string>;
}

export function CheckboxGroupContainer({
  categories,
  selectedIds,
  onToggle,
  disabledIds = new Set(),
  lockedIds = new Set(),
}: CheckboxGroupContainerProps) {
  return (
    <div className="flex flex-col w-full h-full gap-5 overflow-y-auto py-4 px-2">
      {categories.map((category) => {
        const itemsWithDisabled = category.items.map((item) => ({
          ...item,
          disabled: item.disabled ?? disabledIds.has(item.id),
        }));

        return (
          <div key={category.label} className="flex flex-col gap-3 shrink-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {itemsWithDisabled.map((item) => {
                const isSelected = selectedIds.has(item.id);
                const isDisabled = item.disabled ?? false;
                const isLocked = lockedIds.has(item.id);

                return (
                  <div
                    key={item.id}
                    onClick={() =>
                      !isDisabled && !isLocked && onToggle(item.id)
                    }
                    className={cn(
                      "relative flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 select-none",
                      isDisabled &&
                        "opacity-40 pointer-events-none cursor-not-allowed",
                      isLocked && "border-foreground/30 bg-foreground/10",
                      isSelected && !isLocked
                        ? "border-foreground/40 bg-foreground/10"
                        : "border-border bg-foreground/5 hover:border-foreground/20 hover:bg-foreground/8",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-5 h-5 rounded shrink-0 transition-all duration-200",
                        isSelected
                          ? "bg-foreground text-background"
                          : "border border-muted-foreground/30",
                      )}
                    >
                      {isSelected && !isLocked && (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      {isLocked && <Lock className="w-3 h-3" />}
                    </div>

                    {typeof item.icon === "function"
                      ? createElement(item.icon, {
                          className: "w-4 h-4 text-foreground/70",
                        })
                      : item.icon}

                    <span className="text-sm font-medium text-foreground whitespace-nowrap">
                      {item.name}
                    </span>

                    {item.recommended && !isDisabled && !isLocked && (
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                        recommended
                      </span>
                    )}

                    {isDisabled && (
                      <span className="text-[9px] font-medium text-muted-foreground/50">
                        coming soon
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
