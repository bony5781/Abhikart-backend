const Order = require('../modals/Order');

//CREATE ORDER
module.exports.createOrder = async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
}

//UPDATE ORDER
module.exports.updateOrder = async (req, res) => {
    //find and update
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
}

//DELETE CART
module.exports.deleteOrder = async (req, res) => {
    try {
        //Find by id and delte
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json("Order deleted");
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET USER ORDERS
module.exports.getOrder = async (req, res) => {
    try {
        const orders = await Order.findOne({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL ORDERS
module.exports.getAllOrders = async (req, res) => {
    try {
        const Orders = await Order.find();
        res.status(200).json(Orders);
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET MONTHLY INCOME
module.exports.getStats = async (req, res) => {
    const date = new Date();
    //get last month
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    //get previous month
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: prevMonth } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: "$amount",
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                }
            }
        ])
        res.status(200).json(income);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}