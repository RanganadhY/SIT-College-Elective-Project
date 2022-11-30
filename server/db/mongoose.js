const mongoose = require("mongoose");
const env=require("dotenv");

env.config({path:__dirname + "/../env/.env"});

mongoose.connect(process.env.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db=mongoose.connection;

db.on("error",(error)=> console.log(error));
db.once("open",()=>console.log("connected to database"));