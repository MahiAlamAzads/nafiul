const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    ownerName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 500
    },
    type: {
      type: String,
      enum: ["mes", "house", "hotel"],
      required: true
    },
    houseType: {
      type: String,
      enum: ["tinshade", "flat"],
      required: true
    },
    forWhom: {
      type: String,
      enum: ["family", "student", "all"],
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 1
    },
    location: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    images: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one image URL is required"
      }
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available"
    },
    contactNumber: {
      type: String,
      required: true,
      match: /^\+?[0-9]{7,15}$/
    }
  },
  { 
    timestamps: true,       // adds createdAt and updatedAt automatically
    strict: "throw"         // 👈 throws error if unknown fields are used
  }
);

module.exports = mongoose.model("Houselist", houseSchema);