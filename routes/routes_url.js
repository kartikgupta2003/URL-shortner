const express = require("express");
const router = express.Router();
const {handlegenerateNewShortURL , handleRedirect , handleAnalytics} = require("../controllers/controllers_url.js");

router.post("/" , handlegenerateNewShortURL);
router.get("/:shortId" , handleRedirect);
router.get("/analytics/:shortId" , handleAnalytics);

module.exports = router ;