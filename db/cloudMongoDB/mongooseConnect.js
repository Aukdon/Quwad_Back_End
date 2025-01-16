import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

let userName = process.env.CloudMongoDB_User;
let password = process.env.CloudMongoDB_Password;
let cluster = process.env.CloudMongoDB_Cluster;
let dbName = process.env.CloudMongoDB_DB_Name;
let appName = process.env.CloudMongoDB_AppName;

let cloudMongoDBURI = `mongodb+srv://${userName}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=${appName}`;

async function mongooseConnect(){
    try {
        await mongoose.connect(cloudMongoDBURI);
        console.log("Cloud Mongo DB (Atlas) connected successfully.")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default mongooseConnect