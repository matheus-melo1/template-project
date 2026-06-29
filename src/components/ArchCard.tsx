import { Tree } from "react-arborist";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TreeNode, type TreeNodeData } from "@/components/TreeNode";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

import type { Architecture } from "@/types/enum/Architecture.enum";

export type ArchCardData = {
  id: Architecture;
  title: string;
  description: string;
  treeData: TreeNodeData[];
  diagram: ReactNode;
};

export type ArchCardProps = ArchCardData & {
  isSelected?: boolean;
  onSelect?: () => void;
};

export function ArchCard({
  title,
  description,
  treeData,
  diagram,
  isSelected,
  onSelect,
}: ArchCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "flex flex-col gap-4 rounded-2xl border bg-foreground/10 p-4 w-96 h-full cursor-pointer transition-all duration-300 hover:brightness-125",
        isSelected && "border-foreground bg-foreground/15 ring-2 ring-foreground/20"
      )}
    >
      <Tabs defaultValue="diagram" className="w-full min-h-[60%] flex flex-col">
        <TabsList className="w-full">
          <TabsTrigger value="diagram" className="flex-1 text-xs">
            Diagram
          </TabsTrigger>
          <TabsTrigger value="structure" className="flex-1 text-xs">
            Structure
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="structure"
          className="flex-1 rounded-xl border p-2 bg-muted-foreground/20 overflow-hidden tree-container mt-2"
        >
          <Tree<TreeNodeData>
            initialData={treeData}
            openByDefault={true}
            width="100%"
            height={400}
            rowHeight={28}
            indent={16}
            disableDrag={true}
            disableDrop={true}
            disableEdit={true}
          >
            {TreeNode}
          </Tree>
        </TabsContent>
        <TabsContent
          value="diagram"
          className="flex-1 rounded-xl border p-3 bg-muted-foreground/20 overflow-hidden mt-2"
        >
          {diagram}
        </TabsContent>
      </Tabs>

      <div className="flex flex-col justify-between h-full gap-2 overflow-hidden">
        <h2>{title}</h2>
        <ScrollArea className="h-44">
          <p className="text-muted-foreground text-sm!">{description}</p>
        </ScrollArea>
      </div>
    </div>
  );
}
