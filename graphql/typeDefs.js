/**
 * graphql/typeDefs.js
 */

export const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Expense {
    id: ID!
    title: String!
    amount: Float!
    category: String!
    date: String!
    description: String
  }

  type Query {
    me: User
    expenses: [Expense]
    expense(id: ID!): Expense
    expensesByCategory(category: String!): [Expense]
    totalExpense: Float
  }

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
