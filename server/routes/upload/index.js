const express = require('express');
const authMiddleware = require('../../middlewares/isAuthenticate.middleware');
const router = express.Router();

// this is test route
router.get('/',authMiddleware, function(req, res, next) {
  res.send("working")
});

/* GET indez page. */
router.post('/upload',authMiddleware, function(req, res, next) {
  const { title, description, type, houseType, forWhom } = req.body
  if(!title || !description || !type || !houseType || !forWhom) return res.status(400).json({ error: "All fields required" });

  
  
  res.send(req.body)
});

module.exports = router;