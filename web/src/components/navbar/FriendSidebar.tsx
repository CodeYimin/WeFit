import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Formik } from "formik";
import React, { ReactElement } from "react";
import {
  useAcceptFriendRequestMutation,
  useGetFriendRequestsQuery,
  useRemoveFriendMutation,
  useSendFriendRequestMutation,
} from "../../graphql/generated/graphql";

interface FriendSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FriendsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 0.25rem;
  margin-left: 0.25rem;
`;

const CurrentFriendsSection = styled.div``;

const SendFriendRequestSection = styled.div``;

const IncomingFriendSection = styled.div``;

const OutgoingFriendSection = styled.div``;

const RemoveFriendsSection = styled.div``;

function FriendSidebar({ isOpen, onClose }: FriendSidebarProps): ReactElement {
  const [sendFriendRequest] = useSendFriendRequestMutation({
    refetchQueries: "active",
  });

  const [acceptFriendRequest] = useAcceptFriendRequestMutation({
    refetchQueries: "active",
  });

  const [removeFriend] = useRemoveFriendMutation({
    refetchQueries: "active",
  });
  const { data: { me } = {} } = useGetFriendRequestsQuery();

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Friends</DrawerHeader>
          <FriendsSection>
            <CurrentFriendsSection>
              Friends:
              {me?.friends.map((friend) => (
                <div key={friend.id}>{friend.username}</div>
              ))}
            </CurrentFriendsSection>
            <SendFriendRequestSection>
              <div>
                <Formik
                  initialValues={{
                    username: "",
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    await sendFriendRequest({
                      variables: {
                        username: values.username,
                      },
                    });
                    setSubmitting(false);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="username"
                        placeholder="Friend's username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                      />
                      <button type="submit" disabled={isSubmitting}>
                        Send Friend Request
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </SendFriendRequestSection>
            <IncomingFriendSection>
              Incoming Friend Requests:
              {me?.incomingFriendRequests?.map((friendRequest) => (
                <div>
                  <button
                    key={friendRequest.id}
                    onClick={async () => {
                      await acceptFriendRequest({
                        variables: {
                          id: friendRequest.id,
                        },
                      });
                    }}
                  >
                    {friendRequest.username}
                  </button>
                </div>
              ))}
            </IncomingFriendSection>
            <OutgoingFriendSection>
              Outgoing Friend Requests:
              {me?.outgoingFriendRequests?.map((friendRequest) => (
                <p key={friendRequest.id}>{friendRequest.username}</p>
              ))}
            </OutgoingFriendSection>
            <RemoveFriendsSection>
              Remove Friends:
              {me?.friends.map((friend) => (
                <div>
                  <button
                    key={friend.id}
                    onClick={async () => {
                      await removeFriend({
                        variables: {
                          id: friend.id,
                        },
                      });
                    }}
                  >
                    {friend.username}
                  </button>
                </div>
              ))}
            </RemoveFriendsSection>
          </FriendsSection>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default FriendSidebar;
function useIncomingFriendRequests(): {
  data?: { me: any } | undefined;
  error: any;
} {
  throw new Error("Function not implemented.");
}
