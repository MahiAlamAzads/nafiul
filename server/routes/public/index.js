const express = require('express');
const authMiddleware = require('../../middlewares/isAuthenticate.middleware');
const router = express.Router();

// models
const Houselist = require('../../model/House.model');
const { getHouseFeedController } = require('../../controllers/public.house.controller');

// this is test route
router.get('/house-feed', getHouseFeedController);
router.get('/all-houses', getAllHouseController);

async function getAllHouseController(req, res, next) {
  try {
    const query = req.query;
    console.log(query);
    const houses = await Houselist.find()
      .sort({ createdAt: -1 }) // optional: newest first
      .limit(10);
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}




module.exports = router;



