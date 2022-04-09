import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/roboto";
import { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/navbar/NavigationBar";
import FeedPage from "./pages/feed/FeedPage";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Workout from "./pages/workout/Workout";
import Workouts from "./pages/workouts/Workouts";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

const theme = extendTheme({
  fonts: {
    body: "Roboto, sans-serif",
  },
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
              path="/home"
              element={
                <>
                  <NavigationBar />
                  <Home />
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
            <Route
              path="/profile/:id"
              element={
                <>
                  <NavigationBar />
                  <Profile />
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
