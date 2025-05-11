const express= require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const staticRoute = require("./routes/staticRouter.js");
const urlRoute = require("./routes/url.js");
const userRoute = require("./routes/user.js");
const PORT =8001;
const {connectToMongoDB} = require("./connect.js");
const URL = require("./models/url.js");
connectToMongoDB("mongodb://localhost:27017/short-url");
const {restrictToLoggedinUserOnly , checkAuth} = require("./middlewares/auth.js");

app.use(express.json());
app.use(express.urlencoded({extended :  false}));
app.use(cookieParser());


app.set("view engine" , "ejs");
// ye express ko batata hai ki hum konsa view engine use kar rhe hai 
// This line is used in an Express.js app to set EJS (Embedded JavaScript) as the templating/view engine.
// It tells Express:
// “Hey, whenever I render a view (using res.render()), I want to use .ejs files to do it.”
app.set("views" , path.resolve("./views"));
// ab me apne express ko bata rha hu ki jitni bhi ejs ki files hai wo
// particularly iss folder me padi hui hai 

app.use("/" , checkAuth , staticRoute);


// Example of SSR
// app.get("/test" , async(req,res)=>{
//     const allUrls = await URL.find({});
// //     return res.end(`
// //         <html>
// //         <head></head>
// //         <ol>
// //           ${allUrls.map((user)=>{
// //             return `<li>${user.shortId} - ${user. redirectURL} : ${user.visitHistory.length}</li>`
// //           }).join("")}
// //         </ol>
// //         </html>`)
//       res.render("home" , {
//         urls : allUrls,
//       });
//     //   kis file se render karna hai 
// })

app.use("/url" , restrictToLoggedinUserOnly , urlRoute);
// inline middleware , ye tab hi chalega jab /url pe koi request ayegi 
// so basically agar hume urlRoute ko access karna hai to hume logged in hona hi pdega 
// but abhi hum map ka use kar rhe hai so basically agar hamara server restart hota hai 
// to humare map me se data ud jayega so jab ap login karlo uske bad ap use kar paoge url shortner ko 
// but agar server restart hua to nhi kar paoge 
app.use("/user"  , userRoute);
app.use("/find" , urlRoute);
// Express Matching Works Like:
// app.use("/something", router)  
// →  router.get("/more", ...)  
// = Matches /something/more

// app.use("/", router)
// → router.get("/:shortId")
// = Matches /abc123


    


app.listen(PORT , ()=> console.log("Server started at port " , PORT ));
