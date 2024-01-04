import { MongoClient } from 'mongodb';

const Handler = async (req, res) => {

    if (req.method === 'POST') {
        const data = req.body;

        // Connect Data Base
        const client = await MongoClient.connect('mongodb+srv://asadmumtaz92:XQwAH5NF4ESIWyd0@cluster0.heyeael.mongodb.net/userAuthNextTier?retryWrites=true&w=majority');
        const db = client.db();

        // validate user
        const prodCollections = db.collection('users');
        const userFind = await prodCollections.findOne({ email: data?.email});
        client.close();

        if (userFind?.password === data?.password) {
            res.status(200).json({
                status: true,
                message: 'User login successfully!',
                user: {
                    name: userFind?.name,
                    email: userFind?.email,
                }
            });
        }
        else {
            res.status(200).json({ status: false, message: 'Invalid credentials!' });
        }
    }
    else {
        console.log('Something went wrong while login user.')
    }
}

export default Handler;
