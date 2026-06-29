import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStepSelectStack } from "@/hooks/useStepSelectStack";
import type { Stack } from "@/types/enum/Stack.enum";
import type { StepsDependencyInjection } from "@/types/models/StepsDependencyInjection.model";
import { Feather } from "lucide-react";
import { motion } from "motion/react";

export default function StepSelectStack(props: StepsDependencyInjection) {
  const { incrementStep } = props;
  const { stacks, onChangeStack, stackSelected } = useStepSelectStack();

  return (
    <>
      <div className="flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, translateY: "-12px" }}
          animate={{ opacity: 1, translateY: "0px" }}
          exit={{ opacity: 0, translateY: "-12px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          <Feather size={32} className="-translate-y-0.5" />
          <h1 className="text-2xl!">Project Writer</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateY: "-12px" }}
          animate={{ opacity: 1, translateY: "0px" }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center gap-2"
        >
          <h2 className="text-muted-foreground! text-lg! font-light!">
            Select to stack
          </h2>

          <Select
            items={stacks}
            onValueChange={(stack) => onChangeStack(stack as Stack)}
            value={stackSelected}
          >
            <SelectTrigger>
              <SelectValue className="min-w-24 text-sm!" placeholder="Stack" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Front-end stacks</SelectLabel> */}
                {stacks.map((stack) => (
                  <SelectItem key={stack.value} value={stack.value}>
                    {stack.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, translateY: "-12px" }}
        animate={{ opacity: 1, translateY: "0px" }}
        transition={{ duration: 0.6, delay: 0.7, ease: "easeInOut" }}
      >
        <Button onClick={incrementStep} className="font-normal">
          Start writing
        </Button>
      </motion.div>
    </>
  );
}
