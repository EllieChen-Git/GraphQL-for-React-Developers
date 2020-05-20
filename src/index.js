import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  split,
} from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const httpLink = new HttpLink({
  uri: "https://snowtooth.moonhighway.com", //GraphQL endpoint
});

const wsLink = new WebSocketLink({
  uri: `ws://snowtooth.moonhighway.com/graphql`,
  options: {
    reconnect: true,
    lazy: true,
  },
});

// split (delegation function): looks at our query and return a T/F
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink, // (if true) if it's a 'subscription operation', send to websocketlink
  httpLink // (else, if false) if not, send it to httpLink
);

// Client takes 2args (url & cache)
// link: link to GraphQL data source and the cache
// cache: local data that is stored by Apollo client
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

ReactDOM.render(
  // Wrap <App /> with ApolloProvider & add client as a property to the provider
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
