/**
 * graphql/typeDefs.js
 * GraphQL schema type definitions.
 * Defines the shape of Expense data, queries, and mutations.
 */

export const typeDefs = /* GraphQL */ `
  # Expense model - represents a single expense record
  type Expense {
    id: ID!
    title: String!
    amount: Float!
    category: String!
    date: String!
    description: String
  }

  # Queries - read data from the server
  type Query {
    expenses: [Expense]
    expense(id: ID!): Expense
    expensesByCategory(category: String!): [Expense]
    totalExpense: Float
  }

  # Mutations - create, update, or delete data
  type Mutation {
    addExpense(
      title: String!
      amount: Float!
      category: String!
      date: String!
      description: String
    ): Expense

    updateExpense(
      id: ID!
      title: String
      amount: Float
      category: String
      date: String
      description: String
    ): Expense

    deleteExpense(id: ID!): String
  }
`;
