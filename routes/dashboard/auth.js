const express = require("express");
const { login, register, getAllUsers, deleteUser, getUser, updateUser } = require("../../controllers/auth.controller");

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/getUsers", getAllUsers)

router.get("/getUser/:id", getUser)

router.put("/updateUser/:id", updateUser)

router.delete("/deleteUser/:id", deleteUser)


module.exports = router;