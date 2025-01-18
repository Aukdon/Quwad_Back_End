import express from "express";
import { userModel } from "../../db/cloudMongoDB/model.js";

const usersRouter = express.Router();


usersRouter.post("/", async (req,res)=>{
    let body = req.body;
    // console.log(body);
    
    try {
        let userObject = await userModel.findOne({emailId:body.emailId});
        res.send({msg:"User found.", userObject, code:1})
    } catch (error) {
        res.send({msg:"Something went wrong. User profile not found.", code:0})
    }

})

export default usersRouter;