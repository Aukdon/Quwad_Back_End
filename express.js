const port = 8000;

import express from "express";

let server = express();

server.use(express.json()); // To handle JSON data

server.get("/", (req,res)=>{
    res.send("Quwad Back End")
});

server.listen(port,()=>{
    console.log(` ${Date().toString()} Server running on port: ${port}`)
});

