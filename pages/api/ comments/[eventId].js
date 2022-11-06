function handler(req, res) {
    const eventId = req.query.eventId;
console.log(req)
    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (!email || !email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: 'Invalid input'});
            return;
        }

        const newComment = {
            id: new Date().toISOString(),
            email,
            name,
            text
        }

        console.log(email, name, text)
        res.status(201).json({ message: 'Added comment', comment: newComment });
    }

    if (req.method === 'GET') {
        const dummyList = [
            { id: 'c1', name: 'Luda', text: 'First comment' },
            { id: 'c2', name: 'Luda', text: 'Second comment'}
        ];

        res.status(200).json({ comments: dummyList });
    }

}

export default handler;