require("dotenv").config()
const { MongoClient, ServerApiVersion } = require('mongodb');


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
    return client.connect()
}

const db = client.db("ssl-commerz")
const productCollection = db.collection("products")



module.exports = { connectDB, productCollection }



