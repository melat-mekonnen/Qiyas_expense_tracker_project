/**
 * graphql/schema.js
 * Combines typeDefs and resolvers into a single GraphQL schema
 * used by the GraphQL Yoga server.
 */

import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
