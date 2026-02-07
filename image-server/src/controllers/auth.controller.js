const User = require("../src/model/Users.model");
const { hashPassword, comparePassword } = require("../src/helper/bcryptPassword");
const { generateToken } = require("../src/helper/jwt");

async function registerController(req, res) {
  try {
    const { number, email, password, username } = req.body;

    // 1️1 Validate input
    if (!number || !email || !password || !username) {
      return res.status(400).json({ error: "All fields required" });
    }

    // 2️ Check if user and number already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }
    const existingNumber = await User.findOne({ number });
    if (existingNumber) {
      return res.status(409).json({ error: "Number already exists" });
    }

    // 3️ Hash the password
    const hashedPassword = await hashPassword(password);

    // 4️ Create and save user in DB
    const user = new User({
      number: number,
      email: email.toLowerCase(),
      password: hashedPassword,
      username: username
    });
    await user.save();

    // 5 Generate JWT token
    const token = generateToken({ userId: user._id, number: user.number, email: user.email, username: user.username });

    // 6 Send response
    res.status(200).json({
      message: "User signed up successfully",
      user: {
        number: user.number,
        email: user.email,
        username: user.username
      },
      token: token
    });

  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function loginController(req, res) {
  const { number, password } = req.body
  // 1️⃣ Validate input
  if (!number || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  // 2️⃣ Check if user already exists
  const existingUser = await User.findOne({ number });
  console.log(existingUser);
  if (!existingUser) {
    return res.status(409).json({ error: "User not found" });
  }

  // 3️⃣ Compare password
  const isPasswordValid = await comparePassword(password, existingUser.password);
  console.log(isPasswordValid)
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  // 4 Generate JWT token
  const token = generateToken({ userId: existingUser._id, number: existingUser.number, email: existingUser.email, username: existingUser.username });
  console.log(token)
  // 5️⃣ Send response
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      number: existingUser.number,
      email: existingUser.email,
      username: existingUser.username
    },
    token: token
  });
}

module.exports = { registerController, loginController };