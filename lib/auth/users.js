import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";

export async function getUsersCollection() {
  const { db } = await connectToDatabase();
  return db.collection("users");
}

export function formatUser(user) {
  if (!user) return null;
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
}

export async function findUserByEmail(email) {
  const collection = await getUsersCollection();
  return collection.findOne({ email: email.toLowerCase().trim() });
}

export async function findUserById(id) {
  if (!ObjectId.isValid(id)) return null;
  const collection = await getUsersCollection();
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createUser({ name, email, password }) {
  const collection = await getUsersCollection();
  const normalizedEmail = email.toLowerCase().trim();
  const existing = await collection.findOne({ email: normalizedEmail });

  if (existing) {
    const error = new Error("Email already registered");
    error.code = "EMAIL_EXISTS";
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const result = await collection.insertOne({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    createdAt: new Date(),
  });

  const user = await collection.findOne({ _id: result.insertedId });
  return formatUser(user);
}
