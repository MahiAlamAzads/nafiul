const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const app = express();

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // folder to store images
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, uuidv4() + ext); // unique filename
    },
});

const upload = multer({ storage });

// Upload endpoint with resize + compression
app.post("/upload", upload.single("image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const outputPath = path.join("uploads", "resized-" + req.file.filename);

    const fs = require("fs");

    try {
        await sharp(req.file.path)
            .resize({ width: 1280, height: 720 })
            .avif({ quality: 50 })
            .toFile(outputPath);

        // Remove the original file after processing
        fs.unlink(req.file.path, (err) => {
            if (err) console.error("Failed to delete original:", err);
        });

        const imageUrl = `http://localhost:3001/${outputPath}`;
        res.json({ url: imageUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Image processing failed" });
    }
});

// for test
app.get("/", (req, res) => {
    res.send("hello");
});

// Serve static files
app.use("/uploads", express.static("uploads"));

module.exports = app;