import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/navbar/NavigationBar";
import FeedPage from "./pages/feed/FeedPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Workout from "./pages/workout/Workout";
import Workouts from "./pages/workouts/Workouts";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default function App(): ReactElement {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavigationBar />
                  <FeedPage />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <NavigationBar />
                  <Register />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <NavigationBar />
                  <Login />
                </>
              }
            />
            <Route
              path="/workouts"
              element={
                <>
                  <NavigationBar />
                  <Workouts />
                </>
              }
            />
            <Route path="/workout" element={<Workout />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
}
