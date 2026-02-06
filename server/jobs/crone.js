const cron = require("node-cron");
const Houselist = require("./../model/House.model");

cron.schedule("0 0 * * *", async () => { // runs every midnight
  const now = new Date();
  await Houselist.updateMany(
    { subscriptionExpiresAt: { $lt: now } },
    { $set: { visibility: "private", isPaid: false } }
  );
});