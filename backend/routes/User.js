const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
router.get("/getUsers", userController.getUsers);
router.post("/register", userController.register);
router.post("/login", userController.Login);

module.exports = router;
