import { ReactElement, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useCreateWorkoutRecordMutation,
  useWorkoutSchemaByIdQuery,
  WorkoutRecordExerciseInput,
} from "../../graphql/generated/graphql";
import Exercising from "./stages/Exercising";
import WorkoutEnd from "./stages/WorkoutEnd";
import WorkoutStart from "./stages/WorkoutStart";

interface WorkoutProps {}

function Workout({}: WorkoutProps): ReactElement {
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
    variables: {
      workoutSchemaId: schemaId!,
      name: "Unnamed Workout",
      exercises: recordItems,
    },
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
    return <WorkoutEnd />;
  }

  function handleExerciseComplete(recordItem: WorkoutRecordExerciseInput) {
    if (exerciseIndex + 1 < schema!.exercises.length) {
      setExerciseIndex(exerciseIndex + 1);
    } else {
      createWorkoutRecord();
      setEnded(true);
    }

    setRecordItems([...recordItems, recordItem]);
  }

  return (
    <Exercising
      exercise={schema.exercises[exerciseIndex]}
      onComplete={handleExerciseComplete}
    />
  );
}

export default Workout;
