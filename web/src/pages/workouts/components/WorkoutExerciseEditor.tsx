import { Box, HStack, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Formik } from "formik";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import {
  useDeleteWorkoutSchemaExerciseMutation,
  useUpdateWorkoutSchemaExerciseMutation,
  WorkoutSchemaExercise,
  WorkoutSchemaExerciseInput,
} from "../../../graphql/generated/graphql";

const ExerciseName = styled.input`
  background: #f3f3f3;
  padding: 0.5rem 1.5rem;
  border-radius: 0.75rem;
  width: 100%;
`;

const FieldInput = styled.input`
  background: #f3f3f3;
  padding: 0.25rem;
  border-radius: 0.5rem;
  width: 3rem;
  text-align: center;
`;

interface WorkoutExerciseEditorProps {
  exercise: WorkoutSchemaExercise;
}

function WorkoutExerciseEditor({
  exercise: { id, name, reps, weight, duration },
}: WorkoutExerciseEditorProps): ReactElement {
  const [data, setData] = useState<WorkoutSchemaExerciseInput>({
    name,
    reps,
    weight,
    duration,
  });

  const [editExercise] = useUpdateWorkoutSchemaExerciseMutation({
    variables: { exerciseId: id, data },
    refetchQueries: "active",
  });
  const [deleteExercise] = useDeleteWorkoutSchemaExerciseMutation({
    variables: { exerciseId: id },
    refetchQueries: "active",
  });

  useEffect(() => {
    editExercise();
  }, [data]);

  return (
    <HStack>
      <Box>
        <Formik
          initialValues={{
            name,
            reps: reps?.toString() || "",
            weight: weight?.toString() || "",
            duration: duration?.toString() || "",
          }}
          onSubmit={async ({ name, reps, weight, duration }) => {
            if (
              (weight.length && !parseFloat(weight)) ||
              (reps.length && !parseFloat(reps)) ||
              (duration.length && !parseFloat(duration))
            ) {
              return;
            }

            setData({
              name,
              reps: parseFloat(reps) || undefined,
              weight: parseFloat(weight) || undefined,
              duration: parseFloat(duration) || undefined,
            });
          }}
        >
          {({ values, handleChange, submitForm }) => (
            <VStack minW="20rem">
              <ExerciseName
                name="name"
                value={data.name || ""}
                onChange={(e) => {
                  handleChange(e);
                  submitForm();
                }}
              />
              <HStack w="full">
                <Box>
                  Reps:{" "}
                  <FieldInput
                    name="reps"
                    onChange={(e) => {
                      handleChange(e);
                      submitForm();
                    }}
                    value={data?.reps?.toString() || ""}
                  />
                </Box>
                <Box>
                  Weight:{" "}
                  <FieldInput
                    name="weight"
                    onChange={(e) => {
                      handleChange(e);
                      submitForm();
                    }}
                    value={data?.weight?.toString() || ""}
                  />
                </Box>
                <Box>
                  Duration:{" "}
                  <FieldInput
                    name="duration"
                    onChange={(e) => {
                      handleChange(e);
                      submitForm();
                    }}
                    value={data?.duration?.toString() || ""}
                  />
                </Box>
              </HStack>
            </VStack>
          )}
        </Formik>
      </Box>
      <Button onClick={() => deleteExercise()}>Delete</Button>
    </HStack>
  );
}

export default WorkoutExerciseEditor;
