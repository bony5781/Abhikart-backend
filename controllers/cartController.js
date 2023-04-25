const Cart = require('../modals/Cart');

//CREATE CART
module.exports.createCart = async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
}

//UPDATE CART
module.exports.updateCart = async (req, res) => {
    //find and update
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
}

//DELETE CART
module.exports.deleteCart = async (req, res) => {
    try {
        //Find by id and delte
        await Cart.findByIdAndDelete(req.params.id);
        return res.status(200).json("Cart deleted");
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET USER CART
module.exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL CARTS
module.exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
}
