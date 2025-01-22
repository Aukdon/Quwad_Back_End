import express from "express";
import cors from "cors"
import signInRouter from "./routes/authentication/signIn/signIn.js";
import signUpRouter from "./routes/authentication/signUp/signup.js";
import mongooseConnect from "./db/cloudMongoDB/mongooseConnect.js";
import tournamentsRouter from "./routes/tournaments/tournaments.js";
import usersRouter from "./routes/users/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

await mongooseConnect();

const port = 8000;
let server = express();

server.use(express.json()); // To handle JSON data
server.use(cors());

// Protecting or Authorizing Backend API endpoints. 
function authorizeAPI(req, res, next){
    try {
        let token = req.headers.authorization;
        let decoded = jwt.verify(token, process.env.JWT_Key);
        // console.log(decoded);
        next();
    } catch (error) {
        // Error
        res.send({msg:"Not Authorized to access.", code:0})
    }
}

server.get("/", (req,res)=>{
    res.send("Quwad Back End")
});

server.use("/signin", signInRouter);
server.use("/signup", signUpRouter);
server.use("/tournaments", authorizeAPI, tournamentsRouter);
server.use("/users", authorizeAPI, usersRouter);

server.listen(port,()=>{
    console.log(` ${Date().toString()} Server running on port: ${port}`);
});
