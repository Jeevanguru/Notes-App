const User = require("../../models/userModel");
const hash = require("../../utils/hashPassword");

const createUser = async (req, res) => {
    try {
        const { name, email, password, loginType } = req.body;
        // console.log("Request to sign up");

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({ message: "User already exists. Try logging in." });
        }

        const hashedPassword = await hash(password);

        const newUser = await new User({ name, email, loginType, password: hashedPassword }).save();

        return res.status(201).json({
            message: "User created successfully",
            newUser: newUser
        });

    } catch (err) {
        console.error("Error in createUser:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

module.exports = createUser;