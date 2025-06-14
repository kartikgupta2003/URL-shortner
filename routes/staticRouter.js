const express = require("express");
const router = express.Router();
const URL = require("../models/url.js");
const {restrictTo} = require("../middlewares/middleware_auth.js");

router.get("/admin/urls" , restrictTo(["ADMIN"]) , async (req,res)=>{
    // if(!req.user) return res.redirect('/login');
    const allurls = await URL.find({});
    return res.render("home" , {
        urls : allurls
    });})


router.get("/" , restrictTo(["NORMAL" , "ADMIN"]) , async (req,res)=>{
    // if(!req.user) return res.redirect('/login');
    const allurls = await URL.find({createdBy : req.user._id});
    return res.render("home" , {
        urls : allurls
    });
})

router.get("/signup" , (req,res)=>{
    return res.render("signup");
});

router.get("/login" , (req,res)=>{
    return res.render("login");
});

module.exports = router;