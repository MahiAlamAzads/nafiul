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
    res.send("seacrh route working: ", req.query);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// this is test route
router.get('/house-feed', getHouseFeedController);
router.get('/all-houses', getAllHouseController); //search method included


async function getAllHouseController(req, res, next) {
  try {
    const query_params = req.query;
    const query = {};
    // all possible query: {ownerName, title, type, houseType, forWhom, location, status, contactNumber}
    // ✅ Advanced search filters
    if (query_params.ownerName) query.ownerName = { $regex: query_params.ownerName, $options: "i" };
    if (query_params.title) query.title = { $regex: query_params.title, $options: "i" };
    if (query_params.type) query.type = query_params.type;
    if (query_params.houseType) query.houseType = query_params.houseType;
    if (query_params.forWhom) query.forWhom = query_params.forWhom;
    if (query_params.location) query.location = { $regex: query_params.location, $options: "i" };
    if (query_params.status) query.status = query_params.status;
    if (query_params.contactNumber) query.contactNumber = query_params.contactNumber;

    // ✅ Pagination
    const limit = Number(query_params.limit) > 0 ? Number(query_params.limit) : 10;
    const page = Number(query_params.page) > 0 ? Number(query_params.page) : 1;
    const offset = (page - 1) * limit;

    // ✅ Fetch data + count in one go (aggregation)
    const result = await Houselist.aggregate([
      {
        $match: {
          ...query,              // spread your dynamic filters
          visibility: "public"   // ✅ correct spelling, inside the same object
        }
      },
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: offset },
            { $limit: limit },
            {
              $project: {
                title: 1,
                location: 1,
                type: 1,
                houseType: 1,
                forWhom: 1,
                updatedAt: 1,
                ownerName: 1
              }
            }
          ],
          totalCount: [{ $count: "count" }]
        }
      }
    ]);

    const houses = result[0].data;
    const totalCount = result[0].totalCount[0]?.count || 0;

    res.status(200).json({
      message: "Houses fetched successfully",
      query,
      limit,
      page,
      offset,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      data: houses
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
}




module.exports = router;


/**
 * 1. for pagination, we have to know how many records we have, how many we want to show per page, and how many pages we have.
 * 2. so, every, fetching of a page, we have to calculate the offset.
 * 3. for limit, we have to know how many records we want to show per page.
 * 4. so, every, fetching of a page, we have to calculate the limit.
 */


