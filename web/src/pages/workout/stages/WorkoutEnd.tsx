import { Box, Text, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";
import { XLButton } from "../../../components/Button";

interface WorkoutEndProps {}

function WorkoutEnd({}: WorkoutEndProps): ReactElement {
  return (
    <VStack spacing="2rem" h="100vh" justifyContent="center">
      <Text fontSize="6xl">Yay! You completed the workout!</Text>
      <Box>
        <XLButton onClick={() => {}}>Finish</XLButton>
      </Box>
    </VStack>
  );
}

export default WorkoutEnd;
