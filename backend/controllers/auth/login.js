const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const verifyPassword = require("../../utils/comparePassword");

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ email: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email }).select("+password").populate("notes");

        if(!user) {
            return res.status(401).json({ error: "User not found" });
        }

        if (user.loginType === "standard") {
            const isMatch = await verifyPassword(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
        } else {
            return res.status(400).json({
                error: `User signed up using ${user.loginType}. Please use the correct login method.`,
            });
        }

        user.password = undefined;

        const tokenPayload = { userId: user._id };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return res.status(200).json({
            message: "Login Successful",
            token,
            user,
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = login;