import { MongoClient, ServerApiVersion } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' });
            return;
        }

        // const client = await MongoClient.connect('mongodb+srv://luda:moskaliuk777@cluster0.b2j5vvk.mongodb.net/?retryWrites=true&w=majority');

        // const db = client.db('newsletter');

        // await db.collection('emails').insertOne({ email: userEmail });

        // client.close();

        const uri = "mongodb+srv://luda:moskaliuk777@cluster0.b2j5vvk.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

     client.connect(err => {
            const collection = client.db("test").collection("devices");
            console.log(2, err)
            // perform actions on the collection object
            client.close();
          });

        const db = client.db('newsletter');

        await db.collection('emails').insertOne({ email: userEmail });
console.log(1, userEmail)
        client.close();

        res.status(201).json({ message: 'Signed up'})
    }
}

export default handler;

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://luda:<password>@cluster0.b2j5vvk.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });