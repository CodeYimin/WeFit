import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ReactElement } from "react";
import { BrowserRouter, Routes } from "react-router-dom";

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
          <Routes></Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
}
