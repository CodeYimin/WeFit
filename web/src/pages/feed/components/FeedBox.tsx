import styled from "@emotion/styled";
import { ReactElement } from "react";

const BoxHeader = styled.div`
  display: flex;
  background-color: #ececec;
`;

const BoxContent = styled.div`
  display: flex;
  background-color: #fafafa;
`;

interface boxProps {
  header: string;
  content: string;
}

function box({ header, content }: boxProps): ReactElement {
  return (
    <div>
      <BoxHeader>{header}</BoxHeader>
      <BoxContent>{content}</BoxContent>
    </div>
  );
}

export default box;
