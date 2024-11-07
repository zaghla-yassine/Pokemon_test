import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://pokeapi.co/api/v2/pokemon/ditto",
  cache: new InMemoryCache(),
});

export default client;
