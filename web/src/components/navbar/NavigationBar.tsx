import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactElement } from "react";
import { BiExit } from "react-icons/bi";
import { BsPeopleFill, BsPersonFill } from "react-icons/bs";
import { CgFeed } from "react-icons/cg";
import { FaDumbbell } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../../graphql/generated/graphql";
import FriendSidebar from "./FriendSidebar";

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #fafafa;
  border-bottom: 1px solid #eaeaea;
`;

const BarTitle = styled.button<{ isActive: boolean }>`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  transition: 0.3s;
  background-color: ${(props) => (props.isActive ? "lightgray" : "#fafafa")};
  &:hover {
    background-color: lightgray;
  }
`;

const BarButtons = styled.div`
  display: flex;
  justify-content: space-around;
  order: 2;
  border-color: black;
`;

const BarButton = styled.button<{ isActive: boolean }>`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
  color: #333;
  margin: 0 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.isActive ? "lightgray" : "#fafafa")};
  transition: 0.3s;
  &:hover {
    background-color: lightgray;
  }
`;

interface NavigationBarProps {}

function NavigationBar() {
  const pathName = useLocation().pathname;

  const navigate = useNavigate();
  const {
    isOpen: friendsOpen,
    onOpen: onFriendsOpen,
    onClose: onFriendsClose,
  } = useDisclosure();

  const { data: { me } = {}, error } = useMeQuery();
  const [logout] = useLogoutMutation({ refetchQueries: "active" });

  if (!me && !error) {
    return <></>;
  }

  let barButtons: ReactElement;

  if (error || !me) {
    barButtons = (
      <>
        <BarButton
          isActive={pathName === "/register"}
          onClick={() => navigate("/register")}
        >
          Sign up
        </BarButton>
        <BarButton
          isActive={pathName === "/workouts"}
          onClick={() => navigate("/login")}
        >
          Log In
        </BarButton>
      </>
    );
  } else {
    barButtons = (
      <>
        <BarButton
          isActive={pathName === "/workouts"}
          onClick={() => navigate("/workouts")}
        >
          <HStack>
            <FaDumbbell fontSize="3rem" />
            <Text>Workouts</Text>
          </HStack>
        </BarButton>
        <BarButton isActive={pathName === "/"} onClick={() => navigate("/")}>
          <HStack>
            <CgFeed fontSize="3rem" />
            <Text>Feed</Text>
          </HStack>
        </BarButton>
        <BarButton
          isActive={false}
          onClick={() => {
            onFriendsOpen();
          }}
        >
          <HStack>
            <BsPeopleFill fontSize="3rem" />
            <Text>Friends</Text>
          </HStack>
        </BarButton>
        <BarButton
          isActive={pathName === `/profile/${me.id}`}
          onClick={() => navigate(`/profile/${me.id}`)}
        >
          <HStack>
            <BsPersonFill fontSize="3rem" />
            <Text>Profile</Text>
          </HStack>
        </BarButton>
        <BarButton
          isActive={false}
          onClick={async () => {
            const res = await logout();
            navigate("/home");
          }}
        >
          <HStack>
            <BiExit fontSize="2rem" />
            <Text>Logout</Text>
          </HStack>
        </BarButton>
      </>
    );
  }

  return (
    <>
      <FriendSidebar isOpen={friendsOpen} onClose={onFriendsClose} />
      <Bar>
        <BarTitle
          isActive={pathName === "/home"}
          onClick={() => navigate("/home")}
        >
          WeFit
        </BarTitle>
        <BarButtons>{barButtons}</BarButtons>
      </Bar>
    </>
  );
}

export default NavigationBar;
