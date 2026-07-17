/**
 * app/api/graphql/route.js
 */

import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/schema";
import { getSession } from "@/lib/auth/session";

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
  context: async () => {
    const session = await getSession();
    return { user: session.user ?? null };
  },
});

export { handleRequest as GET, handleRequest as POST };
