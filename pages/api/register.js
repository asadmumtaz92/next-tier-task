import { MongoClient } from 'mongodb';

const Handler = async (req, res) => {

    if (req.method === 'POST') {
        const data = req.body;

        // Connect Data Base
        const client = await MongoClient.connect('mongodb+srv://asadmumtaz92:XQwAH5NF4ESIWyd0@cluster0.heyeael.mongodb.net/userAuthNextTier?retryWrites=true&w=majority');
        const db = client.db();

        // Create Collection/table
        const prodCollections = db.collection('users');

        // CHECK THIS EMAIL IS ALREADY REGISTERED OR NOT
        const checkUserExist = await prodCollections.findOne({ email: data?.email });

        if (checkUserExist?.email === data?.email) {
            res.status(200).json({ status: false, message: 'This email already registered!' });
        }
        else {
            // Insert Data in Collection/Table
            const result = await prodCollections.insertOne(data);
            console.log('Result =', result);

            res.status(201).json({ status: true, message: 'User created successfully!' });
        }
        client.close();
    }
    else {
        console.log('Something went wrong while creating user.')
    }
}

export default Handler;
