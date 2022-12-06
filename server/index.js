require("./db/mongoose");
const express=require("express");
const app=express();

//admin routes
const adminRoutes = require("./routes/admin");

//authentication routes
const auth = require("./routes/auth");
const cors=require("cors");

const port = process.env.PORT;

app.use(cors({
    credentials:true,
    origin:"http://localhost:3001"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using routes
app.use("/admin",adminRoutes);
app.use("/authentication",auth);

app.all("/*",(req,res)=>{
    res.send("page not found");
});

//port listening at in the server
app.listen(port, ()=>{
    console.log("running on port " + port);
});