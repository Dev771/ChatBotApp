import mongoose from "mongoose";
import config from './config.json' assert { type: "json" };

mongoose.connect(config.mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connection To Data Base Successfull!!!!");
});


export default db;