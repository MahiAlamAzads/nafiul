const express = require('express');
const router = express.Router();

/* GET indez page. */
router.post('/', function(req, res, next) {
  res.send("upload")
});

module.exports = router;
