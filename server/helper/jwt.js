require('dotenv').config();
const jwt = require("jsonwebtoken");

function generateToken(payload) {
    const SECRET_KEY = process.env.JWT_SECRET;
    console.log(SECRET_KEY)
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2m", algorithm: "HS256" });
    return token
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = { generateToken, verifyToken };
