import styled from "@emotion/styled";

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f3f3f3;
  border-radius: 0.5rem;
  transition: 0.3s;
  &:hover {
    background-color: lightgray;
  }
`;

export const XSButton = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: #f3f3f3;
  border-radius: 0.25rem;
  transition: 0.3s;
  &:hover {
    background-color: lightgray;
  }
`;

export const XLButton = styled.button`
  background: #f3f3f3;
  font-size: 3rem;
  padding: 0.5rem 3rem;
  border-radius: 1.5rem;
`;
