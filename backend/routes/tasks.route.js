const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");
const checkAuthorization = require("../middlewares/auth.middleware");

const router = express.Router();

// router.use(protect);

router.route("/create-new-task").post(checkAuthorization, createTask);
router.route("/get-my-tasks").get(checkAuthorization, getTasks);
router.route("/get-task/:id").get(checkAuthorization, getTaskById);
router.route("/update-task/:id").put(checkAuthorization, updateTask);
router.route("/delete-task/:id").delete(checkAuthorization, deleteTask);

module.exports = router;
