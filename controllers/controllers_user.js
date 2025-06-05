const User = require("../models/user.js");
const { v4: uuidv4 } = require('uuid');
const {setUser , getUser} = require("../service/service_auth.js");
// iske documentation (at npmjs) me likha hai 
async function handleUserSignup(req,res){
    const {name , email , password} =req.body ;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}
async function handleUserSignin(req , res){
    const {email , password} = req.body;
    const user= await User.findOne({email , password})
    if(!user){
        return res.render("login" , {error : "Invalid Username or Password"});
    }
    // const sessionId = uuidv4();
    // console.log(sessionId);
    // setUser(sessionId , user);
    const token=setUser(user);
    // res.cookie("uid" , sessionId);
    res.cookie("uid" , token);
//     // uid is the name that we have given to this cookie
// //     Scenario: You log in
// // You send your email and password to the server.

// // The server checks if you're a valid user. If yes, it says:

// // "Cool, you're logged in. Here's a secret token (session ID) that proves it's you."

// // But how will your browser remember this token? That's where this line comes in:

// // res.cookie("uid", sessionId);
// // 🔁 This means:

// // "Hey browser, store this session ID in a cookie named uid, and send it back to me every time you visit again."

// // 🍪 What is a Cookie?
// // It's like a small note your browser keeps.

// // Every time you visit the site again, your browser shows that note to the server:

// // "Hey! Here's my uid, remember me?"

// // 🧠 Why do we use it?
// // So that you don’t have to log in again every time you click a new page. The server reads the cookie → sees the session ID → gets your user info → and shows you the right page.

// // So unless:
// // You clear your cookies,

// // Or the session expires,

// // Or you log out manually (which usually means the session ID is deleted),

// // 👉 You stay logged in!


    return res.redirect("/");
    // means redirect to homepage

    // return res.json({token});

}
module.exports={
    handleUserSignup,
    handleUserSignin,
}