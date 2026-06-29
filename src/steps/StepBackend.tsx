import { useStepBackend } from "@/hooks/useStepBackend";
import { SelectableCardGroup } from "@/components/SelectableCardGroup";

export default function StepBackend() {
  const { backends, onChangeBackend, backend } = useStepBackend();

  return (
    <SelectableCardGroup
      items={backends}
      selectedId={backend}
      onSelect={onChangeBackend}
    />
  );
}
