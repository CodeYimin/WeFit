import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Formik } from "formik";
import React, { ReactElement } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useGetFriendRequestsQuery,
  useRejectFriendRequestMutation,
  useRemoveFriendMutation,
  useSendFriendRequestMutation,
} from "../../graphql/generated/graphql";
import { Button, XSButton } from "../Button";
import { Input } from "../Input";

interface FriendSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CurrentFriendsSection = styled.div``;

const FriendRequestForm = styled.form`
  text-align: center;
`;

const IncomingFriendSection = styled.div``;

const OutgoingFriendSection = styled.div``;

function FriendSidebar({ isOpen, onClose }: FriendSidebarProps): ReactElement {
  const navigate = useNavigate();
  const [sendFriendRequest] = useSendFriendRequestMutation({
    refetchQueries: "active",
  });

  const [acceptFriendRequest] = useAcceptFriendRequestMutation({
    refetchQueries: "active",
  });

  const [rejectFriendRequest] = useRejectFriendRequestMutation({
    refetchQueries: "active",
  });

  const [cancelFriendRequest] = useCancelFriendRequestMutation({
    refetchQueries: "active",
  });

  const [removeFriend] = useRemoveFriendMutation({
    refetchQueries: "active",
  });
  const { data: { me } = {} } = useGetFriendRequestsQuery();

  return (
    <>
      <Drawer isOpen={isOpen} size="sm" placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent p="2rem">
          <DrawerCloseButton />
          <DrawerHeader fontSize="1.5rem" fontWeight="bold" mx="auto">
            <HStack>
              <BsFillPeopleFill fontSize="2rem" />
              <Text fontSize="3xl">Friends</Text>
            </HStack>
          </DrawerHeader>
          <VStack justifyContent="space-between" h="full">
            <VStack spacing="1rem" alignItems="start">
              <CurrentFriendsSection>
                <Text fontSize="lg" fontWeight="600">
                  Friends:
                </Text>
                <UnorderedList mt="0.8rem" spacing="0.8rem">
                  {me?.friends.map((friend) => (
                    <ListItem key={friend.id}>
                      <HStack>
                        <Text
                          _hover={{ cursor: "pointer" }}
                          onClick={() => navigate(`/profile/${friend.id}`)}
                        >
                          {friend.username}
                        </Text>
                        <XSButton
                          color="#FF7F7F"
                          onClick={async () => {
                            await removeFriend({
                              variables: {
                                id: friend.id,
                              },
                            });
                          }}
                        >
                          Remove
                        </XSButton>
                      </HStack>
                    </ListItem>
                  ))}
                </UnorderedList>
              </CurrentFriendsSection>
              <IncomingFriendSection
                hidden={!me?.incomingFriendRequests?.length}
              >
                <Text fontSize="lg" fontWeight="600">
                  Incoming Friend Requests:
                </Text>
                <UnorderedList mt="0.8rem" spacing="0.8rem">
                  {me?.incomingFriendRequests?.map((friendRequest) => (
                    <ListItem key={friendRequest.id}>
                      <HStack>
                        <Text
                          _hover={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(`/profile/${friendRequest.id}`)
                          }
                        >
                          {friendRequest.username}
                        </Text>
                        <XSButton
                          color="lightgreen"
                          onClick={async () => {
                            await acceptFriendRequest({
                              variables: {
                                id: friendRequest.id,
                              },
                            });
                          }}
                        >
                          Accept
                        </XSButton>
                        <XSButton
                          color="#FF7F7F"
                          onClick={async () => {
                            await rejectFriendRequest({
                              variables: {
                                fromId: friendRequest.id,
                              },
                            });
                          }}
                        >
                          Reject
                        </XSButton>
                      </HStack>
                    </ListItem>
                  ))}
                </UnorderedList>
              </IncomingFriendSection>
              <OutgoingFriendSection
                hidden={!me?.outgoingFriendRequests?.length}
              >
                <Text fontSize="lg" fontWeight="600">
                  Outgoing Friend Requests:
                </Text>
                <UnorderedList mt="0.8rem" spacing="0.8rem">
                  {me?.outgoingFriendRequests?.map((friendRequest) => (
                    <HStack>
                      <ListItem key={friendRequest.id}>
                        {friendRequest.username}
                      </ListItem>
                      <XSButton
                        color="#FF7F7F"
                        onClick={async () => {
                          await cancelFriendRequest({
                            variables: {
                              toId: friendRequest.id,
                            },
                          });
                        }}
                      >
                        Cancel
                      </XSButton>
                    </HStack>
                  ))}
                </UnorderedList>
              </OutgoingFriendSection>
            </VStack>
            <Formik
              initialValues={{
                username: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                const { errors } = await sendFriendRequest({
                  variables: {
                    username: values.username,
                  },
                  errorPolicy: "all",
                });

                if (errors?.length) {
                  setErrors({ username: errors[0].message });
                }
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
                <FriendRequestForm onSubmit={handleSubmit}>
                  <VStack>
                    <Input
                      type="text"
                      name="username"
                      placeholder="Send a friend request to username..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      style={{ width: "20rem" }}
                    />
                    <Text color="red">{errors.username}</Text>
                    <Button
                      color="lightgreen"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Send Friend Request
                    </Button>
                  </VStack>
                </FriendRequestForm>
              )}
            </Formik>
          </VStack>
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
