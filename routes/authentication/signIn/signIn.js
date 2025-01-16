import express from "express";
import { userModel } from "../../../db/cloudMongoDB/model.js";

const signInRouter = express.Router();

signInRouter.get("/", async (req,res)=>{
    res.send({msg:"Sign In GET request triggered.", code:1});
});

signInRouter.post("/", async (req,res)=>{
    let body = req.body;

    // Check if user exist.
    let userObject = await userModel.findOne({emailId:body.emailId});
    if(userObject){

        // Check password
        if(body.password===userObject.password){
            res.send({msg:"Signed in.", code:0});
        }else{
            res.send({msg:"Check password.", code:0});
        }
        
    }else{
        res.send({msg:"Email Id not found. Sign Up", code:0});
    }
});

export default signInRouter