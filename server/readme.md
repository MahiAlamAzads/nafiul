for authentication:
    number and email should be unique


<pre>
<!-- this is demo product -->
{
  "title": "Cozy 2-Bedroom Flat in City Center",
  "description": "Spacious flat with modern amenities, close to transport.",
  "type": "house",          // "mes", "house", "hotel"
  "houseType": "flat",      // "tinshade", "flat"
  "forWhom": "family",          // "family", "student", "all"
  "price": 12000,
  "location": "Rangpur",
  "address": "123 Green Road, Rangpur",
  "images": ["https://example.com/img1.jpg", "https://example.com/img2.jpg"],
  "status": "available",
  "contactNumber": "+8801712345678"
}
</pre>

<!-- 
🔧 Bonus: Auto-cleanup with a Cron Job
If you want to enforce expiry without waiting for a save/update, you can run a daily cron job that checks all houses:

const cron = require("node-cron");
const Houselist = require("./models/Houselist");

cron.schedule("0 0 * * *", async () => { // runs every midnight
  const now = new Date();
  await Houselist.updateMany(
    { subscriptionExpiresAt: { $lt: now } },
    { $set: { visibility: "private", isPaid: false } }
  );
});



👉 This way, your system is subscription-aware: listings automatically expire, users can’t cheat by setting public without paying, and you can even batch‑clean expired subscriptions with a cron job.

 -->