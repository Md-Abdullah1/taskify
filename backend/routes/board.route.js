const express = require("express");
const router = express.Router();
const {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} = require("../controllers/board.controller");
const { checkAuthorization } = require("../middlewares/auth.middleware");

router.route("/").post(checkAuthorization, createBoard).get(checkAuthorization, getBoards);
router
  .route("/:id")
  .get(checkAuthorization, getBoardById)
  .put(checkAuthorization, updateBoard)
  .delete(checkAuthorization, deleteBoard);

module.exports = router;
