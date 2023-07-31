import mongoose from 'mongoose';

const connection = {};


async function dbConnect() {

    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    connection.isConnected = db.connections[0].readyState;
    if(connection.isConnected){
        console.log("Connected to MongoDb")
    }
    else(
        console.log("Problem in DB connection")
    )
}

export default dbConnect;