import { Center, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactElement } from "react";
import {
  User,
  WorkoutRecord as IWorkoutRecord,
} from "../../../graphql/generated/graphql";
import WorkoutRecord from "../components/WorkoutRecord";

const FeedColumn = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 1rem;
`;

interface FeedSectionProps {
  workouts: (Pick<
    IWorkoutRecord,
    "id" | "name" | "exercises" | "createdAt" | "workoutSchemaId"
  > & {
    user: Pick<User, "id" | "username">;
  } & {
    likedBy: Pick<User, "id">[];
  })[];
}

function FeedSection({ workouts }: FeedSectionProps): ReactElement {
  return (
    <div>
      <VStack spacing="2rem">
        {!workouts.length && <Center>There are no workouts posted</Center>}
        {workouts.map((record) => (
          <WorkoutRecord workout={record} />
        ))}
      </VStack>
    </div>
  );
}

export default FeedSection;
