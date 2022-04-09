import { VStack } from "@chakra-ui/react";
import { ReactElement } from "react";
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
    <VStack spacing="2rem" mt="5rem">
      <Button
        onClick={async () => {
          await createWorkoutSchema({
            variables: { name: "Untitled Workout" },
          });
        }}
      >
        + Create New Workout
      </Button>
      {workoutSchemas.map((workoutSchema) => (
        <WorkoutEditor key={workoutSchema.id} workout={workoutSchema} />
      ))}
    </VStack>
  );
}

export default Workouts;
