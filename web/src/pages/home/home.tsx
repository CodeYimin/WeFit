import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactElement } from "react";
import Hero from "./components/Hero";

interface HomeProps {}

const HomeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Home({}: HomeProps): ReactElement {
  return (
    <HomeSection>
      <Hero />
      <Text fontSize="xl" textAlign="center" mt="2rem">
        Develop a healthy habit of exercising while also competing against your
        friends.
      </Text>
    </HomeSection>
  );
}

export default Home;
