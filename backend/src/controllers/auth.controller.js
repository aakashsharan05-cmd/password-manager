const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
async function register(req, res) {
   
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

// =========================
// GET USER PROFILE
// =========================
async function getProfile(req, res) {
    try {
        // req.user.id comes from auth middleware (JWT decoded)
        const user = await userModel.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch profile"
        });
    }
}

// =========================
// LOGOUT
// =========================
async function logout(req, res) {
    // Clear the token cookie using the same options we set it with
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });

    res.status(200).json({
        message: "Logged out successfully"
    });
}

module.exports = { register, login, getProfile, logout }