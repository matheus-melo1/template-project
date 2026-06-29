import { ArchCard } from "@/components/ArchCard";
import { packageByFeature, featureSlicedDesign, cleanArchitecture } from "./arch/package-by-feature";
import { useStepArchitecture } from "@/hooks/useStepArchitecture";

const architectures = [packageByFeature, featureSlicedDesign, cleanArchitecture];

export default function StepArch() {
  const { architecture, onChangeArchitecture } = useStepArchitecture();

  return (
    <div className="flex gap-5 items-center w-full h-full justify-center py-4">
      {architectures.map((arch) => (
        <ArchCard
          key={arch.id}
          {...arch}
          isSelected={architecture === arch.id}
          onSelect={() => onChangeArchitecture(arch.id)}
        />
      ))}
    </div>
  );
}
