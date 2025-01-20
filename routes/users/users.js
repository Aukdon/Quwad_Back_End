import express from "express";
import { tournamentModel, userModel } from "../../db/cloudMongoDB/model.js";

const usersRouter = express.Router();

// Read a user profile.
usersRouter.post("/", async (req,res)=>{
    let body = req.body;
    // console.log(body);
    
    try {
        let userObject = await userModel.findOne({emailId:body.emailId});
        res.send({msg:"User found.", userObject, code:1})
    } catch (error) {
        res.send({msg:"Something went wrong. User profile not found.", code:0})
    }

});

// Update a user profile.
usersRouter.put("/", async (req,res)=>{
    let body = req.body;
    // console.log(body);
    
    let isOrganizerValue = false
    if(body.mobileNumber!=="" && body.governmentId!=="" && body.bankAccountNumber!=="" && body.bankCode!=="" && body.organizerName!==""){
        isOrganizerValue = true
    }

    try {
        let userObject = await userModel.findOneAndUpdate(
            {emailId:body.emailId},
            {
                ...body,
                isOrganizer:isOrganizerValue,
            }
        );
        if(userObject){
            res.send({msg:"Profile updated.", code:1});
        }else{
            res.send({msg:"Profile not found.", code:0});
        }
        
        
    } catch (error) {
        res.send({msg:"Something went wrong. Try later.", error:error, code:1});
    }
   
});

// Update My registrations array.
usersRouter.post("/myregistrations", async (req, res)=>{
    let body = req.body;
    // console.log(body);

    // Using Find One and Update if already not exist.
    // try {
    //     let userObject = await userModel.findOneAndUpdate(
    //         {emailId:body.emailId},// Filter
    //         {$addToSet: {myRegistrations:body.id}}, // Update value.
    //     );

    //     if(userObject){
    //         res.send({msg:"Updated My Registrations array", code:1})
    //     }else{
    //         res.send({msg:"Not found.", code:0})
    //     }
        
    // } catch (error) {
    //     res.send({msg:"Something went wrong.", error, code:0})
    // }


    // Update the array and throw error if already present.
    try {
        let userObject = await userModel.findOne(
            {emailId:body.emailId},// Filter
        );

        if(userObject.myRegistrations.includes(body.id)){
            res.send({msg:"Already registered.", code:0})
        }else{
            try{
                // Add tournament to user.
                userObject.myRegistrations.push(body.id);
                await userObject.save();

                // Add user to tournament.
                let tournamentObject = await tournamentModel.findOne({_id:body.id});
                tournamentObject.participants.push(body.emailId);
                await tournamentObject.save();

                res.send({msg:"Registered successfully.", code:1});
            
            }catch(error){
                res.send({msg:"Something went wrong.", error, code:0});
            }  
        }     
    } catch (error) {
        res.send({msg:"Something went wrong.", error, code:0})
    }


});

// Get All My registrations.
usersRouter.get("/myregistrations", async (req, res)=> {

    let email = req.query.emailId;

    try {
        let userObject = await userModel.findOne({emailId:email});
        let tournamentIdArray = userObject.myRegistrations;

        let data = await tournamentModel.find({_id : {$in : tournamentIdArray}});
        
        res.send({msg:"Fetched all registrations.", data, code:1})
    } catch (error) {
        res.send({msg:"Something went wrong.", error, code:0})
    }

});

export default usersRouter;