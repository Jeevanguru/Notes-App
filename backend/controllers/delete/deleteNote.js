const mongoose = require("mongoose");
const Note = require("../../models/noteSchema");
const User = require("../../models/userModel");

const deleteNote = async (req, res) => {
    const { userId } = req.user;

    const { noteId } = req.params;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const note = await Note.findOneAndDelete(
            { _id: noteId },
            { session },
        );
        
        if (!note) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ error: "Note not found" });
        }
        
        await User.findOneAndUpdate(
            { _id: noteId },
            { $pull: { notes: noteId }},
            { session },
        )

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: "Note deleted successfully",
            note,
        })

    } catch (err) {
        await session.abortTransaction();

        session.endSession();
        console.error("Transaction failed:", err);
        return res.status(500).json({ error: "Server error"})
    }
}

module.exports = deleteNote;