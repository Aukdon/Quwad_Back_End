import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type: "string",
        required: true
    },
    emailId : {
        type: "string",
        required: true
    },
    password : {
        type: "string",
        required: true
    },
    organizerName:  {
        type: "string",
        required: true
    },
    isOrganizer : {
        type: "boolean",
        required: true
    },
    mobileNumber : {
        type: "string",
        required: false
    },
    governmentId : {
        type: "string",
        required: false
    },
    bankAccountNumber : {
        type: "string",
        required: false
    },
    bankCode : {
        type: "string",
        required: false
    },
    myRegistrations:{
        type: [],
        required: false
    }
});

const tournamentSchema = new mongoose.Schema({
    gameName : {
        type: "string",
        required: true
    },
    gameType : {
        type: "string",
        required: true
    },
    gameMode : {
        type: "string",
        required: true
    },
    organizer : {
        type: "string",
        required: true
    },
    location : {
        type: "string",
        required: true
    },
    time : {
        type: "string",
        required: true
    },
    date : {
        type: "string",
        required: true
    },
    description : {
        type: "string",
        required: false
    },
    registrationFee : {
        type: "string",
        required: true
    },
    totalSlots : {
        type: "number",
        required: true
    },
    prizeAmount : {
        type: "string",
        required: true
    },
    emailId : {
        type: "string",
        required: true
    },
    participants:{
        type: [],
        required: false
    }
});

const userModel = new mongoose.model("user", userSchema, "users");
const tournamentModel = new mongoose.model("tournament", tournamentSchema, "tournaments");

export {userModel, tournamentModel};