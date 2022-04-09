import { Center, Text, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useUserByIdQuery } from "../../graphql/generated/graphql";
import FeedSection from "../feed/sections/FeedSection";

interface ProfileProps {}

function Profile({}: ProfileProps): ReactElement {
  const id = useParams().id;

  const { data: { userById: user } = {}, error } = useUserByIdQuery({
    variables: { id: id || "" },
  });

  if (!user && !error) {
    return <></>;
  }

  if (!user || error) {
    return <Center>User not found</Center>;
  }

  const workoutRecords = user.workoutRecords;

  return (
    <VStack>
      <Text fontSize="3xl">{user.username}</Text>
      <FeedSection workouts={workoutRecords} />
    </VStack>
  );
}

export default Profile;
