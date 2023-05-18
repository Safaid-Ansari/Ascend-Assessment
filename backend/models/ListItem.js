const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  listTitle: {
    type: String,
    required: true,
  },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
