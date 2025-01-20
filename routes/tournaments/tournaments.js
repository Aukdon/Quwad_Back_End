import express from "express";
import { tournamentModel } from "../../db/cloudMongoDB/model.js";

const tournamentsRouter = express.Router();

tournamentsRouter.get("/", async (req,res)=>{
    // Fetch all tournaments.

    try {
        let allTournaments = await tournamentModel.find({}).limit(25);
        res.send({msg:"Fetched twenty five data", allTournaments, code: 1});
    } catch (error) {
        res.send({msg:"Failed to fetch. Someething is broke. Try later.", error, code: 0});
    }
    
});


tournamentsRouter.post("/organizedtournaments", async (req,res)=>{
    // User organized tournaments.
    let body = req.body;    
    try {
        let allTournaments = await tournamentModel.find({emailId: body.emailId}).limit(25);
        res.send({msg:"Fetched organized data.", allTournaments, code: 1});
    } catch (error) {
        res.send({msg:"Failed to fetch. Someething is broke. Try later.", error, code: 0});
    }
    
});

tournamentsRouter.post("/:id", async (req,res)=>{
    // Fetch all tournaments.

    let id = req.params;
    let data = req.body;

    try {
        let tournamentObject = await tournamentModel.findOneAndUpdate(
            {_id:data.id},
            {description: data.description}
        );
        res.send({msg:"Tournament details updated.", code: 1});
    } catch (error) {
        res.send({msg:"Failed to update. Someething is broke. Try later.", error, code: 0});
    }
    
});

tournamentsRouter.post("/", async (req,res)=>{
    
    // Create a new tournament
    try {
        let data = req.body;
        let tournament = new tournamentModel({
            ...data,
        });
        
        await tournament.save();
        res.send({msg:"Tournament Created", code: 1});
    } catch (error) {
        res.send({msg:"All fields are mandatory. Try again.", error:error.message, code: 0});
    }
    
});

tournamentsRouter.delete("/", async (req,res)=>{
    
    // Delete tournament.
    try {
        let data = req.body;

        let tournamentObject = await tournamentModel.findOne({_id:data.id});

        if(tournamentObject.participants.length == 0){

            let result = await tournamentModel.deleteOne({_id:data.id});

            res.send({msg:"Tournament Deleted", result, code: 1});
        }else{
            res.send({msg:"Cannot Delete. Participants already registered.", code: 0});
        }

        
    } catch (error) {
        res.send({msg:"Something went wrong. Try again.", error:error.message, code: 0});
    }
    
});

export default tournamentsRouter;