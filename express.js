import express from "express";
import cors from "cors"
import signInRouter from "./routes/authentication/signIn/signIn.js";
import signUpRouter from "./routes/authentication/signUp/signup.js";
import mongooseConnect from "./db/cloudMongoDB/mongooseConnect.js";

await mongooseConnect();

const port = 8000;
let server = express();

server.use(express.json()); // To handle JSON data
server.use(cors());

server.get("/", (req,res)=>{
    res.send("Quwad Back End")
});

server.use("/signin", signInRouter);
server.use("/signup", signUpRouter);

server.listen(port,()=>{
    console.log(` ${Date().toString()} Server running on port: ${port}`)
});
