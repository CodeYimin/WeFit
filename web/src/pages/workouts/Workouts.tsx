import { HStack, Text, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";
import { FaDumbbell } from "react-icons/fa";
import { Button } from "../../components/Button";
import {
  useCreateWorkoutSchemaMutation,
  useWorkoutSchemasQuery,
} from "../../graphql/generated/graphql";
import WorkoutEditor from "./components/WorkoutEditor";

interface WorkoutsProps {}

function Workouts({}: WorkoutsProps): ReactElement {
  const { data: { workoutSchemas } = {} } = useWorkoutSchemasQuery();

  const [createWorkoutSchema] = useCreateWorkoutSchemaMutation({
    refetchQueries: "all",
  });

  if (!workoutSchemas) {
    return <></>;
  }

  return (
    <VStack spacing="2rem" my="3rem">
      <VStack spacing="0">
        <HStack spacing="1rem">
          <FaDumbbell fontSize="5rem" />
          <Text fontSize="6xl">Workouts</Text>
        </HStack>
        <Text fontSize="2xl">Manage your workout Programs</Text>
      </VStack>
      {workoutSchemas.map((workoutSchema) => (
        <WorkoutEditor key={workoutSchema.id} workout={workoutSchema} />
      ))}
      <Button
        color="lightgreen"
        onClick={async () => {
          await createWorkoutSchema({
            variables: { name: "Untitled Workout" },
          });
        }}
      >
        + Create New Workout
      </Button>
    </VStack>
  );
}

export default Workouts;
