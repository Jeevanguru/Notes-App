const { default: mongoose } = require("mongoose");
const Note = require("../../models/noteSchema");
const User = require("../../models/userModel");

const createNote = async (req, res) => {
    const { userId } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const note = await Note.create(
            [{ title, content, userId }],
            { session }
        );

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { notes: note[0]._id } },
            { session }
        );

        await session.commitTransaction();

        session.endSession();
        
        return res.status(200).json({
            message: "Note added Successfully",
            note: note[0],
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.error("Transaction failed:", err);
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = createNote;