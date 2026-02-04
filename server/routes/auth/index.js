// this route:  /auth/______
const express = require('express');
const { registerController, loginController } = require('../../controllers/auth.controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("auth root");
});

router.post('/login', loginController);

router.post("/register", registerController);


module.exports = router;
