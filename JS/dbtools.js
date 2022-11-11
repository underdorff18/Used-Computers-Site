const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);

client.connect();

const dbtools = {
    collection: client.db('inventorydb').collection('systems'),
    insertSystem: async function (collection, system) {
        const result = await collection.insertOne(system);
        console.log(`Created a system entry with id: ${result.insertedId}`);
    },
    deleteSystem: async function (collection, serial) {
        const result = await collection.deleteOne({ serialnum: serial});
        console.log(`${result.deletedCount} document(s) was/were deleted.`);
    },
    getAllSystems: async function (collection) {
        cursor = await collection.find();
        let allSystems = []
        await cursor.forEach( function (result) {allSystems.push(result);});
        return allSystems;
    }
}

module.exports = dbtools;









