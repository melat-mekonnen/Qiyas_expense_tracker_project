/**
 * app/api/graphql/route.js
 * GraphQL API endpoint using GraphQL Yoga.
 * Handles GET and POST requests at /api/graphql
 */

import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/schema";

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
