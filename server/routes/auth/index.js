// this /auth/______
const express = require('express');
const { comparePassword } = require('../../helper/bcryptPassword');
const User = require('../../model/Users.model');
const { registerController, loginController } = require('../../controllers/auth.controller');
const { generateToken } = require('../../helper/jwt');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("auth root");
});

router.post('/login', loginController);

router.post("/register", registerController);


module.exports = router;
