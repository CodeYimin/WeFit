import styled from "@emotion/styled";
import { ReactElement } from "react";

const BoxHeader = styled.div`
  display: flex;
  background-color: #f3f3f3;
  width: 100%;
  border-radius: 1rem 1rem 0 0;
  padding: 1rem;
`;

const BoxContainer = styled.div`
  display: flex;
  background-color: #fafafa;
  width: 100%;
  border-radius: 0 0 1rem 1rem;
  padding: 1rem 0;
`;

interface boxProps {
  header: string;
  content: string;
}

function box({ header, content }: boxProps): ReactElement {
  return (
    <div>
      <BoxHeader>{header}</BoxHeader>
      <BoxContainer>{content}</BoxContainer>
    </div>
  );
}

export default box;
