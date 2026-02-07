const bcrypt = require('bcrypt');
const saltRounds = 10; // define salt rounds here

async function hashPassword(password) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash)
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err; // propagate error to the caller
  }
}

async function comparePassword(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (err) {
    console.error("Error checking password:", err);
    throw err; // propagate error to the caller
  }
}

module.exports = { comparePassword, hashPassword };
