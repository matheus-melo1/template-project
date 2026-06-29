import type { NodeRendererProps } from "react-arborist";
import {
  File,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export type TreeNodeData = {
  id: string;
  name: string;
  children?: TreeNodeData[];
};

export function TreeNode({ node, style }: NodeRendererProps<TreeNodeData>) {
  const isFile = node.isLeaf;

  return (
    <div
      style={style}
      className="flex items-center gap-1.5 cursor-pointer select-none text-sm text-foreground/80 hover:text-foreground transition-colors"
      onClick={() => node.isInternal && node.toggle()}
    >
      {!isFile &&
        (node.isOpen ? (
          <ChevronDown size={14} className="text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight size={14} className="text-muted-foreground shrink-0" />
        ))}
      {isFile ? (
        <File size={14} className="text-muted-foreground shrink-0 ml-[14px]" />
      ) : node.isOpen ? (
        <FolderOpen size={14} className="text-muted-foreground shrink-0" />
      ) : (
        <Folder size={14} className="text-muted-foreground shrink-0" />
      )}
      <span>{node.data.name}</span>
    </div>
  );
}
