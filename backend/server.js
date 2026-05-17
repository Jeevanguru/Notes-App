require("dotenv").config();

const authRoutes = require("./routes/googleLogin");
const createNote = require("./routes/createNote");
const deleteNote = require("./routes/deleteNote");
const updateNote = require("./routes/editNote");

const express = require("express");
const cors = require("cors");

const connectToMongo = require("./db/config");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectToMongo();

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/auth", authRoutes)
app.use("/api", createNote)
app.use("/api", deleteNote)
app.use("/api", updateNote)

app.get("/health", (req, res) => {
  res.send("Sevre ok")
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});