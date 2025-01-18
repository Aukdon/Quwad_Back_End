import express from "express";
import { userModel } from "../../../db/cloudMongoDB/model.js";
import bcrypt from "bcrypt";

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
        res.send({msg:"User already exist sign in.",code:0});
    }else{
        // Create new user
        
        try {

            // Hashing passwords using bcrypt package.
            bcrypt.hash(body.password, 10, async (error, hash)=>{
                if(error){
                    res.send({msg:"Password storing failed.",code:0});
                }else{

                    // Creating new user.
                    let user = new userModel({
                        ...body,
                        password: hash,
                    });
        
                    await user.save();
                    res.send({msg:"User created.", code:1});
                }
            })
        } catch (error) {
            res.send({msg:"Can't able to create user.", error, code:0})   
        }
    }    
});

export default signUpRouter