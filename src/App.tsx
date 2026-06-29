import Silk from "./components/Silk";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import Steps from "./steps/Steps";
import { FormProvider } from "react-hook-form";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";
import { useWizard } from "./hooks/useWizard";

function App() {
  const {
    step,
    stepTitle,
    isOptionalStep,
    isLastStep,
    isStepComplete,
    incrementStep,
    decrementStep,
    formHook,
  } = useWizard();
  console.log(formHook.watch());

  const htmlMotionProps: HTMLMotionProps<"h2" | "div"> = {
    initial: { opacity: 0, y: "-12px" },
    animate: { opacity: 1, y: "0px" },
    exit: { opacity: 0, y: "12px" },
    transition: { duration: 0.3, ease: "easeInOut" },
  };

  return (
    <main className="relative w-full h-screen p-4 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <motion.div
        className={cn(
          step > 3 ? "w-full h-full" : "w-96 h-[20rem]",
          "relative z-10 p-4 rounded-xl transition-all duration-500 border flex flex-col items-center bg-background/70 backdrop-blur-sm justify-between",
        )}
      >
        {step !== 1 && (
          <motion.h2
            {...htmlMotionProps}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            {stepTitle}
            {isOptionalStep && (
              <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                optional
              </span>
            )}
          </motion.h2>
        )}

        <FormProvider {...formHook}>
          <Steps step={step} incrementStep={incrementStep} />
        </FormProvider>

        <AnimatePresence mode="wait">
          {step !== 1 && (
            <motion.div
              {...htmlMotionProps}
              className="w-full flex justify-between"
            >
              <Button
                onClick={decrementStep}
                className="font-normal!"
                variant="outline"
              >
                Back
              </Button>
              <Button
                className="font-normal!"
                onClick={incrementStep}
                disabled={!isStepComplete()}
              >
                {isLastStep ? "Generate" : "Next"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

export default App;
