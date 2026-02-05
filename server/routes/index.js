const express = require('express');
const router = express.Router();

const authRouter = require("./auth/index")
const houseRouter = require("./house/index")

router.use("/auth", authRouter)
router.use("/house", houseRouter)
router.use("/public", require("./public/index"))

/* GET indez page. */


module.exports = router;
