import { useStepComponentLibrary } from "@/hooks/useStepComponentLibrary";
import { SelectableCardGroup } from "@/components/SelectableCardGroup";

export default function StepComponentLibrary() {
  const { componentLibraries, onChangeComponentLibrary, componentDesign } =
    useStepComponentLibrary();

  return (
    <SelectableCardGroup
      items={componentLibraries}
      selectedId={componentDesign}
      onSelect={onChangeComponentLibrary}
    />
  );
}
