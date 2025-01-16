import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type: "string",
        require: true
    },
    emailId : {
        type: "string",
        require: true
    },
    password : {
        type: "string",
        require: true
    },
    isOrganizer : {
        type: "boolean",
        require: true
    },
    mobileNumber : {
        type: "string",
        require: false
    },
    governmentId : {
        type: "string",
        require: false
    },
    bankAccountNumber : {
        type: "string",
        require: false
    },
    bankCode : {
        type: "string",
        require: false
    },
});

const userModel = new mongoose.model("user", userSchema, "users");

export {userModel};