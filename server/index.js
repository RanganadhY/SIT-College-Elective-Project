require("./db/mongoose");
const express=require("express");
const app=express();
const cors=require("cors");

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/*",(req,res)=>{
    res.send("page not found");
});

//port listening at in the server
app.listen(port, ()=>{
    console.log("running on port " + port);
});