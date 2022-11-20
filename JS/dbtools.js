const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);

client.connect();

const dbtools = {
    collection: client.db('inventorydb').collection('systems'),
    insertSystem: async function (system) {
        const result = await this.collection.insertOne(system);
        console.log(`Created a system entry with id: ${result.insertedId}`);
    },
    updateSystem: async function (system) {
        console.log(system);
        const result = await this.collection.replaceOne({ serialnum: system.serialnum }, {
            serialnum: system.serialnum,
            model: system.model,
            OS: system.OS,
            price: system.price,
            specs: system.specs
        });
        console.log(`${result.deletedCount} document(s) was/were updated.`);
    },
    deleteSystem: async function (serial) {
        const result = await this.collection.deleteOne({ serialnum: serial});
        console.log(`${result.deletedCount} document(s) was/were deleted.`);
    },
    getAllSystems: async function () {
        cursor = await this.collection.find();
        let allSystems = []
        await cursor.forEach( function (result) {allSystems.push(result);});
        return allSystems;
    }
}

module.exports = dbtools;









