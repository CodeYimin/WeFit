import { Center, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import {
  useCancelFriendRequestMutation,
  useMeQuery,
  useRemoveFriendMutation,
  useSendFriendRequestMutation,
  useUserByIdQuery,
} from "../../graphql/generated/graphql";
import FeedSection from "../feed/sections/FeedSection";

interface ProfileProps {}

function Profile({}: ProfileProps): ReactElement {
  const id = useParams().id;
  const toast = useToast();

  const { data: { userById: user } = {}, error } = useUserByIdQuery({
    variables: { id: id || "" },
  });
  const { data: { me } = {} } = useMeQuery();
  const [removeFriend] = useRemoveFriendMutation({
    variables: {
      id: id || "",
    },
    refetchQueries: "active",
  });
  const [sendFriendRequest] = useSendFriendRequestMutation({
    variables: {
      username: user?.username || "",
    },
    refetchQueries: "active",
  });
  const [cancelFriendRequest] = useCancelFriendRequestMutation({
    variables: {
      toId: user?.id || "",
    },
    refetchQueries: "active",
  });

  if (!user && !error) {
    return <></>;
  }

  if (!user || error) {
    return <Center>User not found</Center>;
  }

  const workoutRecords = user.workoutRecords;
  const isSelf = user.id === me?.id;
  const isFriend = user.friends.some((friend) => friend.id === me?.id);
  const isRequested = user.incomingFriendRequests.some(
    (request) => request.id === me?.id
  );

  return (
    <VStack my="3rem">
      <VStack p="1rem" borderRadius="1rem" mb="3rem">
        <VStack spacing="0">
          <HStack>
            <BsFillPersonFill fontSize="5rem" />
            <Text fontSize="6xl">{user.username}</Text>
          </HStack>
          <Text fontSize="2xl">Viewing profile: {user.username}</Text>
        </VStack>
        {isFriend && (
          <Button
            color="#FF7F7F"
            onClick={async () => {
              const { errors } = await removeFriend();
              if (!error) {
                toast({ title: "Friend removed", status: "success" });
              }
            }}
          >
            Remove friend
          </Button>
        )}
        {isRequested && (
          <Button
            color="#FF7F7F"
            onClick={async () => {
              const { errors } = await cancelFriendRequest();
              if (!error) {
                toast({ title: "Cancelled Friend Request", status: "success" });
              }
            }}
          >
            Cancel friend request
          </Button>
        )}
        {!isSelf && !isFriend && !isRequested && (
          <Button
            color="lightgreen"
            onClick={async () => {
              const { errors } = await sendFriendRequest();
              toast({ title: "Friend request sent", status: "success" });
            }}
          >
            Send friend request
          </Button>
        )}
      </VStack>
      <FeedSection workouts={workoutRecords} />
    </VStack>
  );
}

export default Profile;
