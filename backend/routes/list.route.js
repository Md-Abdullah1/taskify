const express = require("express");
const router = express.Router();
const {
  createList,
  getLists,
  updateList,
  deleteList,
} = require("../controllers/list.controller");
const { checkAuthorization } = require("../middlewares/auth.middleware");

router.route("/").post(checkAuthorization, createList).get(checkAuthorization, getLists);
router.route("/:id").put(checkAuthorization, updateList).delete(checkAuthorization, deleteList);

module.exports = router;
