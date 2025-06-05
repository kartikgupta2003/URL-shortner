const shortid =require("shortid");
const URL = require("../models/url.js");
async function handlegenerateNewShortURL(req , res) {
    const body= req.body ;
    if(!body.url) return res.status(400).json({error : "url is required"});
    const shortID = shortid();
    await URL.create({
        shortId : shortID ,
        redirectURL : body.url,
        visitHistory : [],
        createdBy : req.user._id,
    });
    return res.render("home" , {
        id: shortID
    })
    // return res.json({id : shortID});
}

async function handleRedirect(req,res){
    console.log("shortId param:", req.params.shortId);
const check = await URL.findOne({ shortId: req.params.shortId });
console.log("Found in DB:", check);

    const shortID = req.params.shortId;
    const updated = await URL.findOneAndUpdate({
        shortId : shortID
    } ,{
        $push : {visitHistory : {timestamp : Date.now()}}
    } ,
    { new: true });
    // 🔍 What does { new: true } mean?
// It tells Mongoose to return the updated document after the update operation is complete, not the original document.
    if (!updated) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(updated.redirectURL);
}

async function handleAnalytics(req,res){
    const shortID = req.params.shortId;
    const entry = await URL.findOne({
        shortId : shortID
    });
    res.json({totalClicks : entry.visitHistory.length , Analytics : entry.visitHistory});
}

module.exports={
    handlegenerateNewShortURL,
    handleRedirect,
    handleAnalytics,
}