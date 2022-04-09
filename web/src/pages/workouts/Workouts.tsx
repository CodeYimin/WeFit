import { ReactElement } from "react";
import { useWorkoutSchemasQuery } from "../../graphql/generated/graphql";

interface WorkoutsProps {}

function Workouts({}: WorkoutsProps): ReactElement {
  const { data: { workoutSchemas } = {} } = useWorkoutSchemasQuery();

  if (!workoutSchemas) {
    return <></>;
  }

  return (
    <div>
      {workoutSchemas.map((workoutSchema) => (
        <div key={workoutSchema.id}>{workoutSchema.name}</div>
      ))}
    </div>
  );
}

export default Workouts;
