import { GraphQLError } from "graphql";

export function requireAuth(context) {
  if (!context?.user) {
    throw new GraphQLError("Authentication required", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return context.user;
}

export function getUserId(context) {
  return requireAuth(context).id;
}
