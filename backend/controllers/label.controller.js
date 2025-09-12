const Label = require("../models/label.model");

// Create Label 
const createLabel = async (req, res) => {
  const { name, color, boardId } = req.body;

  try {
    // Check if label already exists in this board
    const existing = await Label.findOne({ name, boardId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Label already exists in this board" });
    }

    const label = await Label.create({
      name,
      color: color || "#3498db", // default blue
      boardId,
    });

    res.status(201).json(label);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Label creation failed", error: error.message });
  }
};

// Get all labels for a board
const getLabels = async (req, res) => {
  try {
    const { boardId } = req.query;
    if (!boardId) {
      return res.status(400).json({ message: "boardId is required" });
    }

    const labels = await Label.find({ boardId });
    res.json(labels);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fetching labels failed", error: error.message });
  }
};

// Update Label (name or color)
const updateLabel = async (req, res) => {
  try {
    const label = await Label.findOneAndUpdate(
      { _id: req.params.id, boardId: req.body.boardId },
      req.body,
      { new: true }
    );

    if (!label) {
      return res.status(404).json({ message: "Label not found" });
    }

    res.json(label);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Delete Label
const deleteLabel = async (req, res) => {
  try {
    const label = await Label.findOneAndDelete({
      _id: req.params.id,
      boardId: req.body.boardId,
    });

    if (!label) {
      return res.status(404).json({ message: "Label not found" });
    }

    // Optional: remove label from all tasks
    // await Task.updateMany(
    //   { labels: req.params.id },
    //   { $pull: { labels: req.params.id } }
    // );

    res.json({ message: "Label deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

module.exports = { createLabel, getLabels, updateLabel, deleteLabel };
