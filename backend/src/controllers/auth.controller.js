const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
async function register(req, res) {
    console.log(req.body);
    const { username, email, password } = req.body


    const isUserExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });
    if (isUserExist) {
        return res.status(400).json({
            message: "user alreay exist"
        })
    }


    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        email,
        password: hash

    })

    res.status(201).json({
        message: "register successfully",
    });
}

async function login(req, res) {



    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordvalid = await bcrypt.compare(password, user.password)

    if (!isPasswordvalid) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }
    const token = jwt.sign(
    {
        id: user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);
    res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
});

    res.status(200).json({
        message: "Login successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email

        }
    })
}
module.exports = { register, login }