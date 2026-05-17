const express = require("express");
const router = express.Router();

const tokenMiddleware = require("../middleware/verifyTokenMid");
const deleteNote = require("../controllers/delete/deleteNote");

router.delete("/note/delete/:noteId", tokenMiddleware, deleteNote);

module.exports = router;