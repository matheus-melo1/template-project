import { ScrollArea } from "@/components/ui/scroll-area";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "motion/react";

export type DesignSystemCardProps = {
  title: string;
  description: string;
  preview: ReactNode;
  radius: string;
  isSelected: boolean;
  onSelect: () => void;
};

export function DesignSystemCard({
  title,
  description,
  preview,
  radius,
  isSelected,
  onSelect,
}: DesignSystemCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative flex flex-col gap-4 rounded-2xl border p-4 w-72 h-full cursor-pointer transition-all duration-300 group",
        isSelected
          ? "border-foreground bg-foreground/10 shadow-lg shadow-foreground/5"
          : "border-border bg-foreground/5 hover:border-foreground/30 hover:bg-foreground/8 hover:shadow-md"
      )}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-foreground flex items-center justify-center"
        >
          <Check className="w-3.5 h-3.5 text-background" />
        </motion.div>
      )}

      <div
        className={cn(
          "rounded-xl border p-3 overflow-hidden h-56 text-current transition-colors duration-300",
          isSelected ? "bg-foreground/5 border-foreground/20" : "bg-muted-foreground/15 border-border"
        )}
      >
        {preview}
      </div>

      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-medium">{title}</h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-foreground/10 text-muted-foreground border border-foreground/10">
            {radius}
          </span>
        </div>
        <ScrollArea className="flex-1">
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </ScrollArea>
      </div>
    </div>
  );
}
