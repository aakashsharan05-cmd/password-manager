const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/auth.controller");

const authUser = require("../middleware/auth.middleware");

const {
    createPassword,
    getPassword,
    updatePassword,
    deletePassword
} = require("../controllers/password.controller");

router.post("/register", register);

router.post("/login", login);

router.post("/create", authUser, createPassword);

router.get("/get", authUser, getPassword);

router.put("/update/:id", authUser, updatePassword);

router.delete("/delete/:id", authUser, deletePassword);

module.exports = router;