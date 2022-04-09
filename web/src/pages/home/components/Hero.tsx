import styled from "@emotion/styled";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useMeQuery } from "../../../graphql/generated/graphql";
const HeroTitle = styled.div`
  font-size: 10rem;
  font-weight: bold;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  line-height: 1;
`;

const HeroDescription = styled.div`
  font-size: 2.5rem;
`;

const HeroButton = styled.button`
  font-size: 1.5rem;
  background-color: lightgrey;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin: 1rem 0rem 0.5rem 0.5rem;
  transition: 0.3s;
  &:hover {
    background-color: lightgreen;
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-top: 6rem;
  position: relative;
`;

interface HeroProps {}

function Hero({}: HeroProps): ReactElement {
  const navigate = useNavigate();
  const { data: { me } = {}, error } = useMeQuery();

  if (!me && !error) {
    return <></>;
  }

  if (error) {
    return (
      <div>
        <HeroSection>
          <HeroTitle>WeFit</HeroTitle>
          <HeroDescription>Fitness Social Media</HeroDescription>
          <div>
            <HeroButton
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </HeroButton>
            <HeroButton
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </HeroButton>
          </div>
        </HeroSection>
      </div>
    );
  }

  return (
    <div>
      <HeroSection>
        <HeroTitle>WeFit</HeroTitle>
        <HeroDescription>Fitness Social Media</HeroDescription>
        <div>
          <HeroButton
            onClick={() => {
              navigate("/workouts");
            }}
          >
            Workouts
          </HeroButton>
          <HeroButton
            onClick={() => {
              navigate("/");
            }}
          >
            Feed
          </HeroButton>
          <HeroButton
            onClick={() => {
              navigate(`/profile/${me!.id}`);
            }}
          >
            Profile
          </HeroButton>
        </div>
      </HeroSection>
    </div>
  );
}

export default Hero;
