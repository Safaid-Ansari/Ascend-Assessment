const express = require("express");
const router = express.Router();
const listController = require("../controllers/itemList");
router.get("/get", listController.getItemList);
router.post("/create", listController.createList);
module.exports = router;
