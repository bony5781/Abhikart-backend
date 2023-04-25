const router = require('express').Router();
const authjwtToken = require('../controllers/authjwtTokenController');
const productController = require('../controllers/productController')

//CREATE(Only admin)
router.post('/', authjwtToken.verifyTokenAndAdmin, productController.createProduct);

//Update(Only admin)
router.put('/:id', authjwtToken.verifyTokenAndAdmin, productController.updateProduct);

//DELETE(Only admin)
router.delete('/:id', authjwtToken.verifyTokenAndAuthorization, productController.deleteProduct);

//GET PRODUCT
router.get('/find/:id', productController.getProduct);

//GET ALL PRODUCTS
router.get('/', productController.getAllProduct);

module.exports = router;