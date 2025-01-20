import express from "express";
import { userModel } from "../../../db/cloudMongoDB/model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

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
        bcrypt.compare(body.password, userObject.password, async (error, result)=>{
            if(error){
                res.send({msg:"Something wrong.", code:0});
            }else{
                if(result){
                    let payload = {
                        emailId: userObject.emailId,
                        organizerName:userObject.organizerName,
                        fullName: userObject.fullName,
                        isOrganizer: userObject.isOrganizer,
                        isSignedIn: true
                    }
                    let token = jwt.sign({...payload}, process.env.JWT_Key, {expiresIn: '1h'});
                    res.send({msg:"Signed in.", token, code:1});
                }else{
                    res.send({msg:"Wrong password.", code:0});
                }
            }
        });
        
    }else{
        res.send({msg:"Email Id not found. Sign Up", code:0});
    }
});

export default signInRouter