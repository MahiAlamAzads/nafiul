const express = require('express');
const router = express.Router();

const authRouter = require("./auth/index")
const houseRouter = require("./house/index")

router.use("/auth", authRouter)
router.use("/house", houseRouter)


/* GET indez page. */
router.get('/', function(req, res, next) {
  res.send("index");
});

router.get('/demo-house', function(req, res, next){
  res.send("demo house")
})

module.exports = router;
