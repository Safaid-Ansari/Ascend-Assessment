const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
router.post("/create", taskController.createTask);
router.get("/delete/:id", taskController.deleteTask);
router.get("/get", taskController.getTasks);
module.exports = router;
