import { useStepFramework } from "@/hooks/useStepFramework";
import { SelectableCardGroup } from "@/components/SelectableCardGroup";

export default function StepFramework() {
  const { stackFrameworkSelected, onChangeFramework, framework } =
    useStepFramework();

  return (
    <SelectableCardGroup
      items={stackFrameworkSelected}
      selectedId={framework}
      onSelect={onChangeFramework}
    />
  );
}
