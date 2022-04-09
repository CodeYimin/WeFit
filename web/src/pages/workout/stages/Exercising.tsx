import { Box, Text, VStack } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { XLButton } from "../../../components/Button";
import {
  WorkoutRecordExerciseInput,
  WorkoutSchemaExercise,
} from "../../../graphql/generated/graphql";
import { secondsToTime } from "../../../utils/time";
import RepSelection from "./RepSelection";
import WeightSelection from "./WeightSelection";

interface ExercisingProps {
  exercise: Pick<
    WorkoutSchemaExercise,
    "name" | "reps" | "duration" | "weight"
  >;
  onComplete: (recordItem: WorkoutRecordExerciseInput) => void;
}

function Exercising({
  exercise: { name, reps, duration, weight },
  onComplete,
}: ExercisingProps): ReactElement {
  const [timer, setTimer] = useState(0);
  const [isSelecting, setIsSelecting] = useState(false);
  const [repSelectComplete, setRepSelectComplete] = useState(false);
  const [weightSelectComplete, setWeightSelectComplete] = useState(false);
  const [recordItem, setRecordItem] = useState<WorkoutRecordExerciseInput>({
    name,
    duration: 0,
    reps: reps || 0,
    weight: weight || 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isSelecting) {
    if (reps && !repSelectComplete) {
      return (
        <RepSelection
          initialValue={reps.toString()}
          onSelect={(reps) => {
            setRecordItem({ ...recordItem, reps });
            setRepSelectComplete(true);
          }}
        />
      );
    } else if (weight && !weightSelectComplete) {
      return (
        <WeightSelection
          initialValue={weight.toString()}
          onSelect={(weight) => {
            setRecordItem({ ...recordItem, weight });
            setWeightSelectComplete(true);
          }}
        />
      );
    } else {
      onComplete(recordItem);
    }
  }

  return (
    <VStack spacing="0" h="100vh" justifyContent="center">
      {duration && (
        <Text fontSize="4xl">Duration Goal: {secondsToTime(duration)}s</Text>
      )}
      {weight && <Text fontSize="4xl">Weight Goal: {weight}lbs</Text>}
      {reps && <Text fontSize="4xl">Rep Goal: {reps}</Text>}
      <Text fontSize="6xl">Doing {name}</Text>
      <Text fontSize="4xl">{secondsToTime(timer)}</Text>
      <Box pt="2rem">
        <XLButton
          onClick={() => {
            setIsSelecting(true);
            setRecordItem({ ...recordItem, duration: timer });
          }}
        >
          Continue
        </XLButton>
      </Box>
    </VStack>
  );
}

export default Exercising;
