const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
    shortId :{
        type : String ,
        required : true,
        unique : true,
    },
    redirectURL : {
        type : String ,
        required : true,
    },
    visitHistory : [ { timestamp : {type : Number} } ],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
//     createdBy is a field in your schema.

//     It stores an ObjectId that refers to a document in the users collection.

//     The ref: "users" part tells Mongoose to use the users collection when populating this field.
} , {timestamps : true});
// This automatically adds:
// createdAt
// updatedAt
// These are managed by Mongoose and help track when a URL entry was created or last updated.

const URL = mongoose.model("url" , urlSchema);
module.exports = URL;