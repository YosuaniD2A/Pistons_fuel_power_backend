const express = require("express");
const { login, register, getAllUsers, deleteUser } = require("../../controllers/auth.controller");

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/getUsers", getAllUsers)

router.delete("/deleteUser/:id", deleteUser)


module.exports = router;