/**
 * components/Providers.js
 * Wraps the app with ApolloProvider so all components can use GraphQL hooks.
 * Must be a Client Component because Apollo uses React context.
 */

"use client";

import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/graphql/client";

export default function Providers({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
