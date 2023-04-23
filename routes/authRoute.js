const router = require('express').Router();
const authController = require('../controllers/authController');
const authjwtTokenController = require('../controllers/authjwtTokenController');

//Register
router.post("/register", authController.registerUser);

//Login
router.post("/login", authController.loginUser);


module.exports = router;