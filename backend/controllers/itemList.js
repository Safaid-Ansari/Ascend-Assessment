const List = require("../models/ListItem");
module.exports.getItemList = async (req, res, next) => {
  try {
    const list = await List.find();
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    return res.status(200).json({ list: list });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.createList = async (req, res, next) => {
  try {
    const { listTitle } = req.body;

    const list = new List({
      listTitle: listTitle,
    });
    await list.save();
    return res.status(201).json(list);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
