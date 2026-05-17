const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/verifyTokenMid");
const editNote = require("../controllers/update/updateNote");

router.put("/notes/edit", editNote);

module.exports = router;