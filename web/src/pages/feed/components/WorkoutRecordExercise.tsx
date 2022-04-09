import { HStack, Text, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactElement } from "react";
import { WorkoutRecordExercise as IWorkoutRecordExercise } from "../../../graphql/generated/graphql";

const ExerciseName = styled.div`
  background: #f3f3f3;
  padding: 0.5rem 1.5rem;
  border-radius: 0.75rem;
  width: 100%;
  font-weight: bold;
`;

const Field = styled.div`
  background: #f3f3f3;
  padding: 0.25rem;
  border-radius: 0.5rem;
  min-width: 3rem;
  text-align: center;
`;

interface WorkoutRecordExerciseProps {
  exercise: IWorkoutRecordExercise;
}

function WorkoutRecordExercise({
  exercise: { id, name, reps, weight, duration },
}: WorkoutRecordExerciseProps): ReactElement {
  return (
    <VStack w="full">
      <ExerciseName>{name}</ExerciseName>
      <HStack>
        <HStack>
          <Text>Reps: </Text> <Field>{reps}</Field>
        </HStack>
        <HStack>
          <Text>Weight: </Text> <Field>{weight}lbs</Field>
        </HStack>
        <HStack>
          <Text>Duration: </Text> <Field>{duration}s</Field>
        </HStack>
      </HStack>
    </VStack>
  );
}

export default WorkoutRecordExercise;