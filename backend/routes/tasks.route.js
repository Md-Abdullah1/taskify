const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');
const protect = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);

router.post('/create-new-task', createTask);
router.get('/', getTasks);
router.get('/get-task/:id', getTaskById);
router.put('/update-task/:id', updateTask);
router.delete('/delete-task/:id', deleteTask);

module.exports = router;
