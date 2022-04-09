import { ReactElement } from "react";
import Hero from "./hero";

interface HomeProps {}

function Home({}: HomeProps): ReactElement {
  return <Hero />;
}

export default Home;
