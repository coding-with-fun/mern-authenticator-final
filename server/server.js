const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path")

require("colors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// * Initialize express server
const app = express();
app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`.magenta);
});

// * Connect to DB
connectDB();

// * Defining routes
app.use("/user", require("./routes/user.api"));

// * Server static files
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../client", "build", "index.html")
        );
    });
}
