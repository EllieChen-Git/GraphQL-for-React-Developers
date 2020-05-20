import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

// 1. Client takes 2args (url & cache)
// link: link to GraphQL data source and the cache
// cache: local data that is stored by apollo client
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://snowtooth.moonhighway.com/", //GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});

// 2. Wrap <App /> with ApolloProvider & add client as a property to the provider
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
