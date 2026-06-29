import { createElement, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";
import { Check } from "lucide-react";

export interface SelectableCardItem {
  id: string;
  name: string;
  icon: IconType | ReactNode;
  disabled?: boolean;
  recommended?: boolean;
}

interface SelectableCardGroupProps<T extends SelectableCardItem> {
  items: T[];
  selectedId: T["id"] | undefined;
  onSelect: (id: T["id"]) => void;
}

export function SelectableCardGroup<T extends SelectableCardItem>({
  items,
  selectedId,
  onSelect,
}: SelectableCardGroupProps<T>) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-5">
      <motion.div className="w-full flex items-center justify-center gap-4">
        {items.map((item) => {
          const isSelected = selectedId === item.id;
          const isDisabled = item.disabled ?? false;

          return (
            <div
              key={item.id}
              onClick={() => !isDisabled && onSelect(item.id)}
              className={cn(
                "relative flex flex-col items-center justify-center cursor-pointer gap-3 border rounded-2xl w-40 h-36 transition-all duration-300 group",
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

              <p className="text-sm font-medium text-foreground">{item.name}</p>

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
      </motion.div>
    </div>
  );
}
