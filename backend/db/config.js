const mongoose = require("mongoose");
require("dotenv").config();

const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const uri = `mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.MONGODB_PASSWORD}@${process.env.DB_CLUSTER_URL}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster-one`;

const connectToMongo = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully");
    } catch (e) {
        console.error("Error connecting to DB:", e.message);
        process.exit(1); 
    }
};

module.exports = connectToMongo;