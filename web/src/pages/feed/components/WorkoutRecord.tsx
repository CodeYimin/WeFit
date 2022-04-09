import { Box, Flex, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactElement } from "react";
import { AiFillLike } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useLikeWorkoutRecordMutation,
  useMeQuery,
  User,
  useUnlikeWorkoutRecordMutation,
  WorkoutRecord as IWorkoutRecord,
} from "../../../graphql/generated/graphql";
import { timeFromNow } from "../../../utils/time";
import IWorkoutRecordExercise from "./WorkoutRecordExercise";

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
  padding: 1rem;
`;

interface WorkoutRecordProps {
  workout: Pick<
    IWorkoutRecord,
    "id" | "name" | "exercises" | "createdAt" | "workoutSchemaId"
  > & {
    user: Pick<User, "id" | "username">;
  } & {
    likedBy: Pick<User, "id">[];
  };
}

function WorkoutRecord({
  workout: { exercises, id, name, createdAt, user, likedBy, workoutSchemaId },
}: WorkoutRecordProps): ReactElement {
  const navigate = useNavigate();

  const { data: { me } = {} } = useMeQuery();

  const [likeWorkout] = useLikeWorkoutRecordMutation({
    variables: { id },
    refetchQueries: "active",
  });

  const [unlikeWorkout] = useUnlikeWorkoutRecordMutation({
    variables: { id },
    refetchQueries: "active",
  });

  return (
    <VStack w="40rem" spacing="0">
      <HeaderContainer>
        <VStack alignItems="start" w="full">
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <HStack
              fontWeight="800"
              spacing="0.25rem"
              fontSize="2xl"
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/profile/${user.id}`);
              }}
            >
              <BsFillPersonFill />
              <Text>{user.username}</Text>
            </HStack>
            <HStack>
              <Text color="green.300">{likedBy.length}</Text>
              <IconButton
                color="green.400"
                size="sm"
                icon={<AiFillLike />}
                aria-label="like"
                onClick={() => {
                  console.log(likedBy);
                  if (likedBy.some((u) => u.id === me?.id)) {
                    unlikeWorkout();
                  } else {
                    likeWorkout();
                  }
                }}
              />
              {workoutSchemaId && (
                <IconButton
                  color="green.400"
                  size="sm"
                  icon={<FaPlay />}
                  aria-label="play"
                  onClick={() =>
                    navigate(`/workout?schemaId=${workoutSchemaId}`)
                  }
                />
              )}
            </HStack>
          </Flex>
          <Flex w="full" justifyContent="space-between">
            <HStack>
              <Text fontWeight="600">Completed a workout: </Text>
              <Text>{name}</Text>
            </HStack>
            <Text>{timeFromNow(new Date(createdAt))} ago</Text>
          </Flex>
        </VStack>
      </HeaderContainer>
      <ContentContainer>
        <VStack>
          {exercises.map((exercise, index) => (
            <Box py="1.5rem" w="30rem">
              <IWorkoutRecordExercise
                exercise={exercise}
                index={index}
              ></IWorkoutRecordExercise>
            </Box>
          ))}
        </VStack>
      </ContentContainer>
    </VStack>
  );
}

export default WorkoutRecord;
