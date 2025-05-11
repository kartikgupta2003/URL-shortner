const {getUser} = require("../service/service_auth.js");
async function restrictToLoggedinUserOnly(req , res , next){
    console.log(req.cookies);
    const userUid = req.cookies?.uid;
//     // because uid is the name given to cookies
//     // pehle ye check kar rha ki cookies hai , fir unme se uid ko parse karega
//     // otherwise ye not defined ko parse karne ki koshish karega to diikat ho jayegi 
console.log(userUid);
    if(!userUid) console.log("bhasad");
    if(!userUid) return res.redirect('/login');
//     // wo dubara dubara render kyu kare ab to redirect karo
    const user = getUser(userUid);
    console.log(user);
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req , res , next){
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports={
    restrictToLoggedinUserOnly,
    checkAuth,
};


// When a client (like a browser) sends a request to your server, it includes all cookies in a single header like this:

// Cookie: uid=abc123; theme=dark; rememberMe=true
// This whole thing is just one string in the request — and not automatically parsed by Express.

// So what does cookie-parser do?
// It parses that raw cookie string and gives you a nice JavaScript object like this:

// req.cookies = {
//   uid: "abc123",
//   theme: "dark",
//   rememberMe: "true"
// };
// Then you can simply access what you want:

// const userUid = req.cookies.uid;

// cookie-parser is an Express middleware that parses the Cookie header in incoming requests and populates req.cookies with a JavaScript object