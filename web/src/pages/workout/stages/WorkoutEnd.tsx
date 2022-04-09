import { Box, Text, VStack } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { XLButton } from "../../../components/Button";
import { XLInput } from "../../../components/Input";

interface WorkoutEndProps {
  onFinish: (workoutName: string) => void;
}

function WorkoutEnd({ onFinish }: WorkoutEndProps): ReactElement {
  const [inputValue, setInputValue] = useState("");

  return (
    <VStack spacing="2rem" h="100vh" justifyContent="center">
      <Text fontSize="6xl">Yay! You completed the workout!</Text>
      <Text fontSize="6xl">Enter a workout name:</Text>
      <Box>
        <XLInput
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          value={inputValue}
        />
      </Box>
      <Box>
        <XLButton onClick={() => onFinish(inputValue)}>Finish</XLButton>
      </Box>
    </VStack>
  );
}

export default WorkoutEnd;
