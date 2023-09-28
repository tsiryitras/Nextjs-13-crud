import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI + process.env.MONGODB_DB;
// console.log(uri);

const client = new MongoClient(uri);

async function connectMongoDB() {
  try {
    await client.connect();
    console.log(".....Connecté a la base de données.....");
  } catch (error) {
    console.error("Erreur de connection MongoDB", error);
  }
}

export { client, connectMongoDB };
