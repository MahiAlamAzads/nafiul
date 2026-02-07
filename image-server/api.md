<pre>
for authentication api:
    /auth/login - post
    /auth/register - post

for house crud:
    /house/upload - post
    /house/delete - delete
    /house/update - put
</pre>


<!-- 
const express = require("express");
const router = express.Router();
const Houselist = require("../models/Houselist"); // your schema

// GET /houses/search?location=Rangpur&forWhom=family&minPrice=5000&maxPrice=15000
router.get("/houses/search", async (req, res) => {
  try {
    const { location, forWhom, minPrice, maxPrice, status } = req.query;

    // Build dynamic query object
    const query = {};

    if (location) query.location = new RegExp(location, "i"); // case-insensitive match
    if (forWhom) query.forWhom = forWhom;
    if (status) query.status = status;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const houses = await Houselist.find(query).populate("owner", "username email");

    res.json({ results: houses });
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
 -->