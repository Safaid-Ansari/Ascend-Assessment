const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskDescription: {
    type: String,
    required: true,
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
