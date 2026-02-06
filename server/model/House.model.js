const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    ownerName: { type: String, required: true, minlength: 1, maxlength: 50 },
    title: { type: String, required: true, minlength: 5, maxlength: 100 },
    description: { type: String, required: true, minlength: 20, maxlength: 500 },
    type: { type: String, enum: ["mes", "house", "hotel"], required: true },
    houseType: { type: String, enum: ["tinshade", "flat"], required: true },
    forWhom: { type: String, enum: ["family", "student", "all"], required: true },
    price: { type: Number, required: true, min: 1 },
    location: { type: String, required: true },
    address: { type: String, required: true },
    images: {
      type: [String],
      validate: {
        validator: arr => arr.length > 0,
        message: "At least one image URL is required"
      }
    },
    status: { type: String, enum: ["available", "unavailable"], default: "available" },
    contactNumber: { type: String, required: true, match: /^\+?[0-9]{7,15}$/ },
    views: { type: Number, default: 0 },
    subscriptions: { type: Number, default: 0 },

    // ✅ Subscription-based visibility
    visibility: { type: String, enum: ["public", "private"], default: "private" },
    isPaid: { type: Boolean, default: false },
    subscriptionExpiresAt: { type: Date } // 👈 track expiry
  },
  {
    timestamps: true,
    strict: "throw"
  }
);
houseSchema.pre("save", async function () {
  const now = new Date();

  if (this.subscriptionExpiresAt && this.subscriptionExpiresAt < now) {
    this.isPaid = false;
    this.visibility = "private";
  }

  if (this.visibility === "public" && !this.isPaid) {
    throw new Error("Cannot set visibility to public without payment");
  }
});

module.exports = mongoose.model("Houselist", houseSchema);