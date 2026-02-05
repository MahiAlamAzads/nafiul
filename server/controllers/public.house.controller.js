const Houselist = require('../model/House.model');

async function getHouseFeedController(req, res, next){
  try {

    // for future if need
    // const houses = await Houselist.find()
    //   .sort({ createdAt: -1 }) // optional: newest first
    //   .limit(10);

    const houses = await Houselist.aggregate([
      {$sample: { size: 10 }}
    ]);

    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = {
  getHouseFeedController
}