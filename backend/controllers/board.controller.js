const Board = require("../models/board.model");

// Create Board
const createBoard = async (req, res) => {
  const { name } = req.body;
  try {
    const board = await Board.create({
      name,
      createdBy: req.user._id,
    });
    res.status(201).json(board);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Board creation failed", error: error.message });
  }
};

// Get all Boards for user
const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(boards);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fetching boards failed", error: error.message });
  }
};

// Get Board by ID
const getBoardById = async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json(board);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fetching board failed", error: error.message });
  }
};

// Update Board
const updateBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json(board);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Delete Board
const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json({ message: "Board deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

module.exports = {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
};
