const { default: mongoose, mongo } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },

    loginType: {
        type: String,
        enum: ["standard", "googleLogin"],
        default: ["standard"],
    },

    password: {
        type: String,
        required: function () {
            return this.loginType !== "googleLogin";
        },
        select: false
    },

    profilePicture: { type: String },

    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;