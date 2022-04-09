import { Box, HStack, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactElement, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useCreateWorkoutRecordMutation,
  useWorkoutSchemaByIdQuery,
  WorkoutRecordExerciseInput,
} from "../../graphql/generated/graphql";
import { secondsToTime } from "../../utils/time";
import Exercising from "./stages/Exercising";
import WorkoutEnd from "./stages/WorkoutEnd";
import WorkoutStart from "./stages/WorkoutStart";

interface WorkoutProps {}

function Workout({}: WorkoutProps): ReactElement {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const schemaId = searchParams.get("schemaId");

  const {
    loading: workoutSchemaLoading,
    data: { workoutSchemaById: schema } = {},
    error: workoutSchemaError,
  } = useWorkoutSchemaByIdQuery({
    variables: { workoutSchemaId: schemaId || "" },
  });

  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [recordItems, setRecordItems] = useState<WorkoutRecordExerciseInput[]>(
    []
  );

  const [createWorkoutRecord] = useCreateWorkoutRecordMutation({
    refetchQueries: "active",
  });

  if (!schema) {
    return <></>;
  }

  if (!workoutSchemaLoading && (!schema || workoutSchemaError)) {
    return <div>This workout wasn't found</div>;
  }

  if (!started) {
    return <WorkoutStart onStart={() => setStarted(true)} />;
  }

  if (ended) {
    return (
      <WorkoutEnd
        onFinish={async (name) => {
          await createWorkoutRecord({
            variables: {
              workoutSchemaId: schemaId!,
              name: name || "Unnamed Workout",
              exercises: recordItems,
            },
          });
          navigate("/");
          location.reload();
        }}
      />
    );
  }

  function handleExerciseComplete(recordItem: WorkoutRecordExerciseInput) {
    console.log("end");
    if (exerciseIndex + 1 < schema!.exercises.length) {
      setExerciseIndex(exerciseIndex + 1);
    } else {
      setEnded(true);
    }

    setRecordItems([...recordItems, recordItem]);
  }

  return (
    <div>
      <Box ml="2rem" mt="2rem" position="fixed">
        <Text fontWeight="700" fontSize="2xl">
          Progress:{" "}
        </Text>
        {schema!.exercises.map((exercise, index) => (
          <HStack>
            <ExerciseOutline current={index === exerciseIndex}>
              {exercise.name}:
            </ExerciseOutline>
            {Number.isInteger(recordItems[index]?.duration) && (
              <Box>{secondsToTime(recordItems[index]?.duration)}s</Box>
            )}
            {Number.isInteger(recordItems[index]?.reps) && (
              <Box>{recordItems[index]?.reps}reps</Box>
            )}
            {Number.isInteger(recordItems[index]?.weight) && (
              <Box>{recordItems[index]?.weight}lbs</Box>
            )}
          </HStack>
        ))}
      </Box>
      {schema!.exercises.map(
        (exercise, index) =>
          exerciseIndex === index && (
            <Exercising
              exercise={exercise}
              onComplete={handleExerciseComplete}
            />
          )
      )}
    </div>
  );
}

const ExerciseOutline = styled.div<{ current: boolean }>`
  font-weight: ${(props) => (props.current ? "700" : "400")};
  padding: 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid ${(props) => (props.current ? "black" : "none")};
`;

export default Workout;
