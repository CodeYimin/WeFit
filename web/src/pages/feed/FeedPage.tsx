import { Box, Center } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactElement } from "react";
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
    <Box my="3rem">
      <FeedSection workouts={allWorkoutRecords!} />
    </Box>
  );
}

export default FeedPage;
