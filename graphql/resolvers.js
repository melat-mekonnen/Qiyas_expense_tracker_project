/**
 * graphql/resolvers.js
 */

import { GraphQLError } from "graphql";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserId, requireAuth } from "@/lib/auth/context";

const getCollection = async () => {
  const { db } = await connectToDatabase();
  return db.collection("expenses");
};

const parseObjectId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new GraphQLError(`Invalid expense id: ${id}`, {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }
  return new ObjectId(id);
};

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const formatExpense = (expense) => {
  if (!expense) return null;
  return {
    id: expense._id.toString(),
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
    description: expense.description,
  };
};

const userFilter = (userId) => ({ userId: new ObjectId(userId) });

export const resolvers = {
  Query: {
    me: (_, __, context) => requireAuth(context),

    expenses: async (_, __, context) => {
      const userId = getUserId(context);
      const collection = await getCollection();
      const docs = await collection.find(userFilter(userId)).toArray();
      return docs.map(formatExpense);
    },

    expense: async (_, { id }, context) => {
      const userId = getUserId(context);
      const collection = await getCollection();
      const doc = await collection.findOne({
        _id: parseObjectId(id),
        ...userFilter(userId),
      });
      return formatExpense(doc);
    },

    expensesByCategory: async (_, { category }, context) => {
      const userId = getUserId(context);
      const collection = await getCollection();
      const docs = await collection
        .find({
          ...userFilter(userId),
          category: {
            $regex: new RegExp(`^${escapeRegex(category)}$`, "i"),
          },
        })
        .toArray();
      return docs.map(formatExpense);
    },

    totalExpense: async (_, __, context) => {
      const userId = getUserId(context);
      const collection = await getCollection();
      const result = await collection
        .aggregate([
          { $match: userFilter(userId) },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ])
        .toArray();
      return result[0]?.total ?? 0;
    },
  },

  Mutation: {
    addExpense: async (
      _,
      { title, amount, category, date, description },
      context
    ) => {
      const userId = getUserId(context);
      const collection = await getCollection();
      const expenseData = {
        userId: new ObjectId(userId),
        title,
        amount,
        category,
        date,
        description: description || "",
      };
      const result = await collection.insertOne(expenseData);
      const doc = await collection.findOne({ _id: result.insertedId });
      return formatExpense(doc);
    },

    updateExpense: async (
      _,
      { id, title, amount, category, date, description },
      context
    ) => {
      const userId = getUserId(context);
      const collection = await getCollection();
      const update = {
        ...(title !== undefined && { title }),
        ...(amount !== undefined && { amount }),
        ...(category !== undefined && { category }),
        ...(date !== undefined && { date }),
        ...(description !== undefined && { description }),
      };

      const objectId = parseObjectId(id);
      const result = await collection.updateOne(
        { _id: objectId, ...userFilter(userId) },
        { $set: update }
      );

      if (result.matchedCount === 0) {
        throw new GraphQLError(`Expense with id ${id} not found`, {
          extensions: { code: "NOT_FOUND" },
        });
      }

      const doc = await collection.findOne({ _id: objectId });
      return formatExpense(doc);
    },

    deleteExpense: async (_, { id }, context) => {
      const userId = getUserId(context);
      const collection = await getCollection();
      const result = await collection.deleteOne({
        _id: parseObjectId(id),
        ...userFilter(userId),
      });

      if (result.deletedCount === 0) {
        throw new GraphQLError(`Expense with id ${id} not found`, {
          extensions: { code: "NOT_FOUND" },
        });
      }

      return `Expense ${id} deleted successfully`;
    },
  },
};
