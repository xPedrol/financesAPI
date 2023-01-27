const { MongoClient, ObjectId } = require("mongodb");

let singleton: any;

export const connect = async () => {
  if (singleton) return singleton;

  const client = new MongoClient(process.env.MONGO_HOST);
  await client.connect();

  singleton = client.db(process.env.MONGO_DATABASE);
  return singleton;
};
