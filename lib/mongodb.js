import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
const useMongo = Boolean(uri);

let cached = globalThis.mongo;
if (!cached) {
  cached = {
    conn: null,
    promise: null,
    inMemoryExpenses: [],
  };
  globalThis.mongo = cached;
}

const normalizeId = (value) => {
  if (value == null) return null;
  if (value instanceof ObjectId) return value.toString();
  return value.toString();
};

const matchesFilter = (doc, filter = {}) => {
  return Object.entries(filter).every(([key, value]) => {
    if (key === "_id") {
      const docId = normalizeId(doc._id);
      const filterId = normalizeId(value);
      return docId === filterId;
    }

    if (value && typeof value === "object" && value.$regex instanceof RegExp) {
      const fieldValue = doc[key];
      return typeof fieldValue === "string" && value.$regex.test(fieldValue);
    }

    return doc[key] === value;
  });
};

const fakeCollection = {
  find(filter = {}) {
    return {
      toArray: async () => cached.inMemoryExpenses.filter((doc) => matchesFilter(doc, filter)),
    };
  },

  findOne(filter = {}) {
    return cached.inMemoryExpenses.find((doc) => matchesFilter(doc, filter)) || null;
  },

  insertOne(document) {
    const _id = new ObjectId();
    const doc = { _id, ...document };
    cached.inMemoryExpenses.push(doc);
    return { insertedId: _id };
  },

  async updateOne(filter, update) {
    const doc = cached.inMemoryExpenses.find((item) => matchesFilter(item, filter));
    if (!doc) {
      return { matchedCount: 0, modifiedCount: 0, acknowledged: true };
    }

    if (update.$set) {
      Object.assign(doc, update.$set);
    }

    return { matchedCount: 1, modifiedCount: 1, acknowledged: true };
  },

  deleteOne(filter) {
    const index = cached.inMemoryExpenses.findIndex((item) => matchesFilter(item, filter));
    if (index === -1) {
      return { deletedCount: 0, acknowledged: true };
    }
    cached.inMemoryExpenses.splice(index, 1);
    return { deletedCount: 1, acknowledged: true };
  },

  aggregate(pipeline = []) {
    return {
      toArray: async () => {
        const firstStage = pipeline[0] || {};
        if (firstStage.$group && firstStage.$group.total && firstStage.$group.total.$sum === "$amount") {
          const total = cached.inMemoryExpenses.reduce(
            (sum, doc) => sum + (typeof doc.amount === "number" ? doc.amount : 0),
            0
          );
          return [{ _id: null, total }];
        }
        return cached.inMemoryExpenses;
      },
    };
  },
};

export async function connectToDatabase() {
  if (!useMongo) {
    return {
      db: {
        collection: () => fakeCollection,
      },
    };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const client = new MongoClient(uri);
    cached.promise = client.connect().then(() => ({
      client,
      db: client.db(),
    }));
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
