const User = require('../modals/User');
const CryptoJS = require('crypto-js'); //Encrypting and decrypting password)
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (req, res) => {
    //create new user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        //encrypt password using CryptoJS
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC.toString()),
    })
    try {
        //save user
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        //find user
        const user = await User.findOne({ username: req.body.username });
        //no user found condition
        if (!user) { return res.status(401).json("Wrong credentials"); }

        //decrypt password
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        //compare password
        if (originalPassword !== req.body.password) { return res.status(401).json("Wrong credentials") }

        //create access token
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
            process.env.JWT_SEC,
            { expiresIn: "1d" }
        );

        //dont show password
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }

}

module.exports.updateUser = async (req, res, next) => {
    //If there is password encrypt it
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC.toString());
    }

    //find and update
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        //Find by id and delte
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User deleted");
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.getUserForAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others });
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.getAllUsersForAdmin = async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.getStatsOfUsers = async (req, res) => {
    const date = new Date();
    //get last year
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ])
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}