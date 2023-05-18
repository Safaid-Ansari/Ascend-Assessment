const Task = require("../models/Task");
module.exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  if (!tasks) {
    return res.status(404).json({ message: "Task not found" });
  }
  return res.status(200).json({ tasks: tasks });
};

module.exports.createTask = async (req, res) => {
  try {
    const { taskDescription, listId } = req.body;
    const task = new Task({
      taskDescription: taskDescription,
      listId: listId,
    });

    await task.save();
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    let id = req.params.id;
    const taskDeleted = await Task.findByIdAndDelete(id);
    if (!taskDeleted) {
      return res.status(404).json({ message: "Not found task" });
    }
    return res.status(404).json({ message: "deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error " });
  }
};
