const {getUser} = require("../service/service_auth.js");

function checkForAuthentication(req , res , next){
    // const authorizationHeaderValue = req.headers["authorization"];
    // req.user=null;
    // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")) return next();
    // const token = authorizationHeaderValue.split("Bearer ")[1];
    // const user = getUser(token);
    // req.user=user;
    // return next();
    const tokenCookie = req.cookies?.uid;
    req.user=null;
    if(!tokenCookie) return next();
    const token = tokenCookie;
    const user = getUser(token);
    req.user = user;
    return next();
}


// async function restrictToLoggedinUserOnly(req , res , next){
//     // console.log(req.cookies);
//     // const userUid = req.cookies?.uid;
// //     // because uid is the name given to cookies
// //     // pehle ye check kar rha ki cookies hai , fir unme se uid ko parse karega
// //     // otherwise ye not defined ko parse karne ki koshish karega to diikat ho jayegi 
// // console.log(userUid);
//     // if(!userUid) console.log("bhasad");
//     // if(!userUid) return res.redirect('/login');
// //     // wo dubara dubara render kyu kare ab to redirect karo


//     const userUid = req.headers["authorization"];
//     if(!userUid) return res.redirect("/login");
//     const token = userUid.split("Bearer ")[1];
//     // bcz userUid = "Bearer 23u1233ukhdj..."
//     // after splitting with "Bearer "
//     // we get [' ' ,"23u12333..."]
//     // we need the thing at index 1
//     const user = getUser(token);

//     console.log(user);
//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }

// async function checkAuth(req , res , next){
//     // const userUid = req.cookies?.uid;
//     // const user = getUser(userUid);

//     const userUid = req.headers["authorization"];
//     const token = userUid.split("Bearer ")[1];
//     const user = getUser(token);

//     req.user = user;
//     next();
// }


function restrictTo(roles){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
        return next();
    }  
}

module.exports={
    // restrictToLoggedinUserOnly,
    // checkAuth,
    checkForAuthentication,
    restrictTo
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