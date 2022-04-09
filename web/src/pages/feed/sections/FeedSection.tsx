import styled from "@emotion/styled";
import { ReactElement } from "react";
import FeedBox from "../components/FeedBox";

const FeedColumn = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 1rem;
`;

interface FeedSectionProps {}

function FeedSection({}: FeedSectionProps): ReactElement {
  return (
    <div>
      <FeedColumn>
        <FeedBox header={"Hello am not pro"} content={"not pro I am"} />
      </FeedColumn>
    </div>
  );
}

export default FeedSection;
