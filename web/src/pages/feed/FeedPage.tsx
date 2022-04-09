import { Center, HStack, Text, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactElement } from "react";
import { CgFeed } from "react-icons/cg";
import { useAllWorkoutRecordsQuery } from "../../graphql/generated/graphql";
import FeedSection from "./sections/FeedSection";

interface FeedPageProps {}

const FeedBox = styled.div`
  width: 50%;
`;

function FeedPage({}: FeedPageProps): ReactElement {
  const { data: { allWorkoutRecords } = {}, loading } =
    useAllWorkoutRecordsQuery();

  if (loading) {
    return <></>;
  }

  if (!allWorkoutRecords && !loading) {
    return <Center>There are no workouts</Center>;
  }

  return (
    <VStack my="3rem">
      <VStack spacing="0" mb="5rem">
        <HStack>
          <CgFeed fontSize="5rem" />
          <Text fontSize="6xl">Feed</Text>
        </HStack>
        <Text fontSize="2xl">View your friends' workouts</Text>
      </VStack>
      <FeedSection workouts={allWorkoutRecords!} />
    </VStack>
  );
}

export default FeedPage;
