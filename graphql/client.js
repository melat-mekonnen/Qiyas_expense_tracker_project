/**
 * graphql/client.js
 * Apollo Client setup and all GraphQL queries/mutations.
 * Import queries and mutations from this file in your components.
 */

import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";

// Create Apollo Client instance connected to our GraphQL API
export const client = new ApolloClient({
  link: new HttpLink({
    uri: "/api/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

// ============ QUERIES ============

// Get all expenses
export const GET_EXPENSES = gql`
  query GetExpenses {
    expenses {
      id
      title
      amount
      category
      date
      description
    }
  }
`;

// Get a single expense by ID
export const GET_EXPENSE = gql`
  query GetExpense($id: ID!) {
    expense(id: $id) {
      id
      title
      amount
      category
      date
      description
    }
  }
`;

// Get total of all expenses
export const GET_TOTAL_EXPENSE = gql`
  query GetTotalExpense {
    totalExpense
  }
`;

// Get expenses filtered by category
export const GET_EXPENSES_BY_CATEGORY = gql`
  query GetExpensesByCategory($category: String!) {
    expensesByCategory(category: $category) {
      id
      title
      amount
      category
      date
      description
    }
  }
`;

// Dashboard query - gets expenses and total in one request
export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    expenses {
      id
      title
      amount
      category
      date
      description
    }
    totalExpense
  }
`;

// ============ MUTATIONS ============

// Create a new expense
export const ADD_EXPENSE = gql`
  mutation AddExpense(
    $title: String!
    $amount: Float!
    $category: String!
    $date: String!
    $description: String
  ) {
    addExpense(
      title: $title
      amount: $amount
      category: $category
      date: $date
      description: $description
    ) {
      id
      title
      amount
      category
      date
      description
    }
  }
`;

// Update an existing expense
export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense(
    $id: ID!
    $title: String
    $amount: Float
    $category: String
    $date: String
    $description: String
  ) {
    updateExpense(
      id: $id
      title: $title
      amount: $amount
      category: $category
      date: $date
      description: $description
    ) {
      id
      title
      amount
      category
      date
      description
    }
  }
`;

// Delete an expense
export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: ID!) {
    deleteExpense(id: $id)
  }
`;
