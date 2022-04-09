import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { XLButton } from "../../../components/Button";
import { XLInput } from "../../../components/Input";

interface WeightSelectionProps {
  initialValue?: string;
  onSelect: (weight: number) => void;
}

function WeightSelection({
  initialValue,
  onSelect,
}: WeightSelectionProps): ReactElement {
  const [inputValue, setInputValue] = useState(initialValue || "");

  return (
    <VStack spacing="2rem" h="100vh" justifyContent="center">
      <Text fontSize="6xl">What weight did you use?</Text>
      <HStack>
        <XLInput
          onChange={(event) => {
            if (!event.target.value.match(/^[\d\.]*$/)) {
              return;
            }
            setInputValue(event.target.value);
          }}
          value={inputValue}
        />
        <Text fontSize="5xl">lbs</Text>
      </HStack>
      <Box>
        <XLButton
          onClick={() => {
            onSelect(parseFloat(inputValue));
          }}
        >
          Continue
        </XLButton>
      </Box>
    </VStack>
  );
}

export default WeightSelection;
