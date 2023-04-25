const router = require('express').Router();
const authjwtToken = require('../controllers/authjwtTokenController');
const cartController = require('../controllers/cartController')

//CREATE
router.post('/', authjwtToken.verifyToken, cartController.createCart);

//Update
router.put('/:id', authjwtToken.verifyTokenAndAuthorization, cartController.updateCart);

//Delete
router.put('/:id', authjwtToken.verifyTokenAndAuthorization, cartController.deleteCart);

//GET CART
router.get('/find/:userId', authjwtToken.verifyTokenAndAuthorization, cartController.getCart);

//GET ALL CARTS(Only Admin)
router.get('/', authjwtToken.verifyTokenAndAdmin , cartController.getAllCarts);

module.exports = router;