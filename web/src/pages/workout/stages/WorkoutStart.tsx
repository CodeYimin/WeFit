import { Box, Text, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";
import { XLButton } from "../../../components/Button";

interface WorkoutStartProps {
  onStart: () => void;
}

function WorkoutStart({ onStart }: WorkoutStartProps): ReactElement {
  return (
    <VStack spacing="2rem" h="100vh" justifyContent="center">
      <Text fontSize="6xl">Ready to workout?</Text>
      <Box>
        <XLButton onClick={() => onStart()}>Start Workout</XLButton>
      </Box>
    </VStack>
  );
}

export default WorkoutStart;
