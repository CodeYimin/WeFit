import { Box, HStack, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactElement, useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
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
    <VStack w="max-content" minW="40rem" spacing="0">
      <HeaderContainer>
        <Header
          style={{ fontSize: "1.5rem", lineHeight: "1" }}
          value={nameValue}
          onChange={(event) => setNameValue(event.target.value)}
        />
        <HStack>
          <Button
            color="lightgreen"
            onClick={() => navigate(`/workout?schemaId=${id}`)}
          >
            <FaPlay fontSize="1.5rem" />
          </Button>
          <Button color="#FF7F7F" onClick={() => deleteWorkoutSchema()}>
            <BsTrashFill fontSize="1.5rem" />
          </Button>
        </HStack>
      </HeaderContainer>
      <ContentContainer>
        <VStack>
          {exercises.map((exercise) => (
            <Box py="1rem">
              <WorkoutExerciseEditor key={exercise.id} exercise={exercise} />
            </Box>
          ))}
          <Box h="1rem" />
          <Button color="lightgreen" onClick={() => addNewExercise()}>
            + Add New Exercise
          </Button>
        </VStack>
      </ContentContainer>
    </VStack>
  );
}

export default WorkoutEditor;
