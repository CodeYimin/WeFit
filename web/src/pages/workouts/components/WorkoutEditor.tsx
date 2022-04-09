import { Box, HStack, IconButton, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactElement, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import {
  useAddWorkoutSchemaExerciseMutation,
  useDeleteWorkoutSchemaMutation,
  useUpdateWorkoutSchemaMutation,
  WorkoutSchema,
} from "../../../graphql/generated/graphql";
import WorkoutExerciseEditor from "./WorkoutExerciseEditor";

const HeaderContainer = styled.div`
  background-color: #f3f3f3;
  width: 100%;
  border-radius: 1rem 1rem 0 0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentContainer = styled.div`
  background-color: #fafafa;
  width: max-content;
  min-width: 100%;
  border-radius: 0 0 1rem 1rem;
  padding: 2rem;
`;

const Header = styled.input`
  background-color: #f3f3f3;
  padding: 0.5rem;
  font-weight: bold;
`;

interface WorkoutEditorProps {
  workout: Pick<WorkoutSchema, "id" | "name" | "exercises">;
}

function WorkoutEditor({
  workout: { id, name, exercises },
}: WorkoutEditorProps): ReactElement {
  const navigate = useNavigate();
  const [addNewExercise] = useAddWorkoutSchemaExerciseMutation({
    variables: { workoutSchemaId: id, name: "Untitled Exercise" },
    refetchQueries: "active",
  });
  const [nameValue, setNameValue] = useState(name);

  const [updateWorkoutSchema] = useUpdateWorkoutSchemaMutation({
    variables: {
      workoutSchemaId: id,
      name: nameValue,
    },
    refetchQueries: "active",
  });

  const [deleteWorkoutSchema] = useDeleteWorkoutSchemaMutation({
    variables: {
      id,
    },
    refetchQueries: "active",
  });

  useEffect(() => {
    updateWorkoutSchema();
  }, [nameValue]);

  return (
    <VStack w="max-content" minW="30rem" spacing="0">
      <HeaderContainer>
        <Header
          value={nameValue}
          onChange={(event) => setNameValue(event.target.value)}
        />
        <HStack>
          <IconButton
            color="green.400"
            size="sm"
            icon={<FaPlay />}
            aria-label="play"
            onClick={() => navigate(`/workout?schemaId=${id}`)}
          />
          <Button onClick={() => deleteWorkoutSchema()}>Delete</Button>
        </HStack>
      </HeaderContainer>
      <ContentContainer>
        <VStack>
          {exercises.map((exercise) => (
            <WorkoutExerciseEditor key={exercise.id} exercise={exercise} />
          ))}
          <Box h="1rem" />
          <Button onClick={() => addNewExercise()}>+ Add New Exercise</Button>
        </VStack>
      </ContentContainer>
    </VStack>
  );
}

export default WorkoutEditor;
