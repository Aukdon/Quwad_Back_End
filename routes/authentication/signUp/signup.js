import express from "express";
import { userModel } from "../../../db/cloudMongoDB/model.js";

const signUpRouter = express.Router();

signUpRouter.get("/", async (req,res)=>{
    res.send({msg:"Sign Up triggered.", code:1})
});

signUpRouter.post("/", async (req,res)=>{
    let body = req.body;
    //Check if user already exist
    let userObject = await userModel.findOne({emailId:body.emailId})
    
    // Create user if emailId does not exist in DB
    if(userObject){
        res.send({msg:"User already exist sign in.", body,code:0})
    }else{
        // Create new user
        
        try {
            
            let user = new userModel({
                ...body
            });

            await user.save();
            res.send({msg:"User created.", code:1});
        } catch (error) {
            res.send({msg:"Can't able to create user.", error, code:0})   
        }
    }
    
});

export default signUpRouter