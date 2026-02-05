const express = require('express');
const authMiddleware = require('../../middlewares/isAuthenticate.middleware');
const router = express.Router();

// models
const Houselist = require('../../model/House.model');
const { getHouseFeedController } = require('../../controllers/public.house.controller');
const { limitQueryChecker } = require('../../helper/numberValidator');

// searching
router.get('/search', async (req, res, next) => {
  try {
    console.log(req.query);
    res.send("seacrh route working: " , req.query);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// this is test route
router.get('/house-feed', getHouseFeedController);
router.get('/all-houses', getAllHouseController);


async function getAllHouseController(req, res, next) {
  try {
    const query_params = req.query;
    const query = {};
    console.log(query_params);
    // validation of limit
    const limitQuery = Number(query_params.limit);
    query.limit = limitQueryChecker(limitQuery) ? limitQuery : 20;
    console.log(typeof query.limit);
    res.status(200).json(query.limit);

    // validation of offset
    const offsetQuery = Number(query_params.offset);
    query.offset = limitQueryChecker(offsetQuery) ? offsetQuery : 0;
    console.log(typeof query.offset);
    res.status(200).json(query.offset);


    // if (req.body.title) query.title = req.body.title;
    // if (req.body.type) query.type = req.body.type;  //advanced
    // if (req.body.houseType) query.houseType = req.body.houseType; //advanced
    // if (req.body.forWhom) query.forWhom = req.body.forWhom; //advanced
    // if (req.body.location) query.location = req.body.location;
    // if (req.body.status) query.status = req.body.status;
    // if (req.body.contactNumber) query.contactNumber = req.body.contactNumber; //advanced

    // const houses = await Houselist.find()
    //   .sort({ createdAt: -1 }) // optional: newest first
    //   .limit(10);
    // res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}




module.exports = router;



