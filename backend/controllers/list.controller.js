const List = require("../models/list.model");
const Board = require("../models/board.model");

//   Create a new List (Column) in a Board
 
const createList = async (req, res) => {
  const { title, boardId, order } = req.body;

  try {
    if (!boardId) {
      return res.status(400).json({ message: "boardId is required" });
    }

    const board = await Board.findOne({
      _id: boardId,
      $or: [
        { createdBy: req.user._id },
        { "members.user": req.user._id }
      ]
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found or access denied" });
    }

    const list = await List.create({
      title,
      boardId,
      order: order || 0,
    });

    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: "List creation failed", error: error.message });
  }
};

//   Get all Lists for a specific Board
 
const getLists = async (req, res) => {
  try {
    const { boardId } = req.query;

    if (!boardId) {
      return res.status(400).json({ message: "Query param 'boardId' is required" });
    }

    const board = await Board.findOne({
      _id: boardId,
      $or: [
        { createdBy: req.user._id },
        { "members.user": req.user._id }
      ]
    });

    if (!board) {
      return res.status(403).json({ message: "Access to this board is denied" });
    }

    const lists = await List.find({ boardId }).sort({ order: 1 });

    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: "Fetching lists failed", error: error.message });
  }
};


 
const updateList = async (req, res) => {
  const { id } = req.params;
  const { title, order } = req.body;

  try {
    const list = await List.findOne({ _id: id }).populate("boardId", "createdBy members");

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const board = list.boardId;
    const hasAccess =
      board.createdBy.toString() === req.user._id ||
      board.members.some(member => member.user.toString() === req.user._id);

    if (!hasAccess) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Update list
    const updatedList = await List.findByIdAndUpdate(
      id,
      { title, order },
      { new: true, runValidators: true }
    );

    res.json(updatedList);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

//  Delete a List 
 
const deleteList = async (req, res) => {
  const { id } = req.params;

  try {
    const list = await List.findOne({ _id: id }).populate("boardId", "createdBy members");

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const board = list.boardId;
    const isOwner = board.createdBy.toString() === req.user._id;

    if (!isOwner) {
      return res.status(403).json({ message: "Only board owner can delete lists" });
    }

    // Option 1: Delete all tasks in this list
    // await Task.deleteMany({ listId: id });

    // Option 2: Move tasks to another list (safer)
    // await Task.updateMany({ listId: id }, { listId: defaultListId });

    // For now: Just delete list and tasks
    await List.findByIdAndDelete(id);
    // await Task.deleteMany({ listId: id }); // Uncomment if you want to delete tasks

    res.json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

module.exports = { createList, getLists, updateList, deleteList };