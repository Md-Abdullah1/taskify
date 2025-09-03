const express = require("express");
const router = express.Router();
const {
  createLabel,
  getLabels,
  updateLabel,
  deleteLabel,
} = require("../controllers/label.controller");
const { checkAuthorization } = require("../middlewares/auth.middleware");

router.route("/").post(checkAuthorization, createLabel).get(checkAuthorization, getLabels);
router.route("/:id").put(checkAuthorization, updateLabel).delete(checkAuthorization, deleteLabel);

module.exports = router;
