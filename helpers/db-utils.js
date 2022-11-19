import { MongoClient } from "mongodb";

export async function connectDatabase() {
    return await MongoClient.connect('mongodb+srv://luda:Jx9XUPPeU1P37sdq@cluster0.b2j5vvk.mongodb.net/?retryWrites=true&w=majority')
}

export async function insertDocument(client,collection, document) {
    const db = client.db('events');

    return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection, sort, filter ={}) {
    const db = client.db('events');

    return await db.collection(collection).find(filter).sort(sort).toArray();
}
