const express = require('express');
const router = express.Router();

const authRouter = require("./auth/index")
const uploadRouter = require("./upload/index")

router.use("/auth", authRouter)
router.use("/upload", uploadRouter)


/* GET indez page. */
router.get('/', function(req, res, next) {
  res.send("index");
});

router.get('/demo-house', function(req, res, next){
  res.send("demo house")
})

module.exports = router;
