const express= require("express");
const {handleUserSignup , handleUserSignin} = require("../controllers/controllers_user.js");
const router = express.Router();
router.post("/" , handleUserSignup);
router.post("/login" , handleUserSignin);
module.exports = router;