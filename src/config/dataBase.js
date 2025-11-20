const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            dbName: "natural_farms"
        })
        console.log("Db is connected");
    } catch (error) {
        console.error("db is not connected");
        console.log("db is not connected");
    }
}

module.exports = connectDB;