const express = require('express');
const router = express.Router();

const authRouter = require("./auth/index")

router.use("/auth", authRouter)
/* GET indez page. */


module.exports = router;
