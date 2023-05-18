const express = require("express");
const router = express.Router();
router.use("/user", require("./User"));
router.use("/list", require("./ItemList"));
router.use("/task", require("./Task"));
module.exports = router;
