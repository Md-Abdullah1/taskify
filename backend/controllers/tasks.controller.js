const Task = require("../models/task.model");

// ! controllers for performaing CRUD operations on Tasks

// ! Create a task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Task creation failed", error: error.message });
  }
};

// ! Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fetching tasks failed", error: error.message });
  }
};

// !Get single task
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fetching task failed", error: error.message });
  }
};

//! Update task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found check Task again" });
    }

    res.json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Updating a task failed", error: error.message });
  }
};

// ! Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found check again" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Deleting a task failed", error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
