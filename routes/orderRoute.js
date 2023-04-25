const router = require('express').Router();
const authjwtToken = require('../controllers/authjwtTokenController');
const orderController = require('../controllers/orderController')

//CREATE
router.post('/', authjwtToken.verifyToken, orderController.createOrder);

//Update(Only admin)
router.put('/:id', authjwtToken.verifyTokenAndAdmin, orderController.updateOrder);

//DELETE(Only admin)
router.delete('/:id', authjwtToken.verifyTokenAndAdmin, orderController.deleteOrder);

//GET ORDERS
router.get('/find/:id', authjwtToken.verifyTokenAndAuthorization, orderController.getOrder);

//GET ALL ORDERS(Only Admin)
router.get('/', authjwtToken.verifyTokenAndAdmin, orderController.getAllOrders);

//GET MONTHLY INCOME(STATS)
router.get('/stats', authjwtToken.verifyTokenAndAdmin, orderController.getStats);

module.exports = router;