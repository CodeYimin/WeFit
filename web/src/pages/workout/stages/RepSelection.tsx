import { Box, Text, VStack } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { XLButton } from "../../../components/Button";
import { XLInput } from "../../../components/Input";

interface RepSelectionProps {
  initialValue?: string;
  onSelect: (reps: number) => void;
}

function RepSelection({
  onSelect,
  initialValue,
}: RepSelectionProps): ReactElement {
  const [inputValue, setInputValue] = useState(initialValue || "");

  return (
    <VStack spacing="2rem" h="100vh" justifyContent="center">
      <Text fontSize="6xl">How Many Reps Did You Do?</Text>
      <Box>
        <XLInput
          onChange={(event) => {
            if (event.target.value && !event.target.value.match(/^\d+$/)) {
              return;
            }
            setInputValue(event.target.value);
          }}
          value={inputValue}
        />
      </Box>
      <Box>
        <XLButton
          onClick={() => {
            onSelect(parseInt(inputValue));
          }}
        >
          Continue
        </XLButton>
      </Box>
    </VStack>
  );
}

export default RepSelection;
