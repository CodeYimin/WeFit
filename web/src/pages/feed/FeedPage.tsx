import styled from "@emotion/styled";
import { ReactElement } from "react";
import FeedSection from "./sections/FeedSection";

interface FeedPageProps {}

const FeedBox = styled.div`
  width: 50%;
`;

function FeedPage({}: FeedPageProps): ReactElement {
  return (
    <div>
      <FeedSection />
    </div>
  );
}

export default FeedPage;
