// this /auth/______
const express = require('express');
const { hashPassword } = require('../../helper/hashPassword');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("auth root");
});

router.get('/login', (req, res) => {
  res.send("login page");
});

router.post('/register', async(req, res) => {
  const {number, email, password} = req.body;
  if(!number || !email || !password) res.status(400).json({
    error: "All fields required"
  })
  //passwor hash fucntion from other module function
  const hashedPassword = await hashPassword(password);

  res.send({hashedPassword: hashedPassword});
});

module.exports = router;
