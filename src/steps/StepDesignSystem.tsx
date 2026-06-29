import { useStepDesignSystem } from "@/hooks/useStepDesignSystem";
import { DesignSystemCard } from "@/components/DesignSystemCard";
import {
  roundedNone,
  roundedLight,
  roundedMedium,
  roundedHigh,
} from "./arch/design-system-options";

const designSystems = [roundedNone, roundedLight, roundedMedium, roundedHigh];

export default function StepDesignSystem() {
  const { designSystem, onChangeDesignSystem } = useStepDesignSystem();

  return (
    <div className="flex gap-5 items-center w-full h-full justify-center py-4">
      {designSystems.map((ds) => (
        <DesignSystemCard
          key={ds.id}
          title={ds.title}
          description={ds.description}
          preview={ds.preview}
          radius={ds.radius}
          isSelected={designSystem === ds.id}
          onSelect={() => onChangeDesignSystem(ds.id)}
        />
      ))}
    </div>
  );
}
