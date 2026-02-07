require('dotenv').config();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;
function generateToken(payload) {
    console.log(SECRET_KEY)
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h", algorithm: "HS256" });
    return token
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = { generateToken, verifyToken };
