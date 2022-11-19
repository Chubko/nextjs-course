import { connectDatabase, insertDocument, getAllDocuments} from "../../../helpers/db-utils";

async function handler(req, res) {
    const eventId = req.query.eventId;

    let client;

    try {
        client = await connectDatabase();
    } catch (e) {
        res.status(500).json({ message: 'Connection to the database failed!'});
        return;
    }

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (!email || !email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: 'Invalid input'});
            await client.close();
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        }

        let result;
        try {
            result = await insertDocument(client, 'comments',newComment);
            newComment._id = result.insertedId;

            res.status(201).json({ message: 'Added comment', comment: newComment });
        } catch (e) {
            res.status(500).json({ message: 'Inserting data failed!'});
        }
    }

    if (req.method === 'GET') {
        let documents;
        try {
            documents = await getAllDocuments(client, 'comments',{ _id: -1 }, { eventId });
            res.status(200).json({ comments: documents });
        } catch (e) {
            res.status(500).json({ message: 'Getting comments failed!'});
        }
    }
    await client.close();
}

export default handler;
