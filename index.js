const express= require("express");
const app = express();
const PORT =8001;
const urlRoute = require("./routes/url.js");
const {connectToMongoDB} = require("./connect.js");
const URL = require("./models/url.js");
connectToMongoDB("mongodb://localhost:27017/short-url");

app.use(express.json());

app.use("/url" , urlRoute);
app.use("/" , urlRoute);
// Express Matching Works Like:
// app.use("/something", router)  
// →  router.get("/more", ...)  
// = Matches /something/more

// app.use("/", router)
// → router.get("/:shortId")
// = Matches /abc123


app.listen(PORT , ()=> console.log("Server started at port " , PORT ));