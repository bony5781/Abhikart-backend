const router = require('express').Router();
const authjwtToken = require('../controllers/authjwtTokenController');
const authController = require('../controllers/authController')

//UPDATE
router.put('/:id', authjwtToken.verifyTokenAndAuthorization, authController.updateUser);

//DELETE
router.delete('/:id', authjwtToken.verifyTokenAndAuthorization, authController.deleteUser);

//GET USER(ADMIN)
router.get('/find/:id', authjwtToken.verifyTokenAndAdmin, authController.getUserForAdmin);

//GET ALL USERS(ADMIN)
router.get('/', authjwtToken.verifyTokenAndAdmin, authController.getAllUsersForAdmin);

//GET USER STATS(ADMIN)
router.get('/stats',authjwtToken.verifyTokenAndAdmin,authController.getStatsOfUsers);

module.exports = router;