import { Box, IconButton, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactElement } from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import {
  useAddWorkoutSchemaExerciseMutation,
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
  width: 100%;
  border-radius: 0 0 1rem 1rem;
  padding: 1rem 0;
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

  return (
    <VStack w="30rem" spacing="0">
      <HeaderContainer>
        <Box>{name}</Box>
        <IconButton
          size="sm"
          icon={<FaPlay />}
          aria-label="play"
          onClick={() => navigate(`/workout?schemaId=${id}`)}
        />
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
