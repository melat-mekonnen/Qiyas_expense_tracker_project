"use client";

import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/graphql/client";
import AuthProvider from "@/components/AuthProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthProvider>
  );
}
