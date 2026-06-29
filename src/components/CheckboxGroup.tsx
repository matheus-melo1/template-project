import { createElement, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";
import { Check } from "lucide-react";

export interface CheckboxItem {
  id: string;
  name: string;
  icon: IconType | ReactNode;
  disabled?: boolean;
  recommended?: boolean;
}

interface CheckboxGroupProps {
  items: CheckboxItem[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}

export function CheckboxGroup({
  items,
  selectedIds,
  onToggle,
}: CheckboxGroupProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {items.map((item) => {
        const isSelected = selectedIds.has(item.id);
        const isDisabled = item.disabled ?? false;

        return (
          <div
            key={item.id}
            onClick={() => !isDisabled && onToggle(item.id)}
            className={cn(
              "relative flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 select-none",
              isDisabled && "opacity-40 pointer-events-none cursor-not-allowed",
              isSelected
                ? "border-foreground/40 bg-foreground/10"
                : "border-border bg-foreground/5 hover:border-foreground/20 hover:bg-foreground/8"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-5 h-5 rounded shrink-0 transition-all duration-200",
                isSelected
                  ? "bg-foreground text-background"
                  : "border border-muted-foreground/30"
              )}
            >
              {isSelected && <Check className="w-3.5 h-3.5" />}
            </div>

            {typeof item.icon === "function"
              ? createElement(item.icon, { className: "w-4 h-4 text-foreground/70" })
              : item.icon}

            <span className="text-sm font-medium text-foreground whitespace-nowrap">
              {item.name}
            </span>

            {item.recommended && !isDisabled && (
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
  );
}
