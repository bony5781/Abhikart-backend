const router = require('express').Router();
const stripeController = require('../controllers/stripeController');

router.post('/payment', stripeController.payment);


module.exports = router;